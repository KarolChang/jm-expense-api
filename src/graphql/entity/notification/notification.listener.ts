import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, getRepository } from 'typeorm'
import { Notification } from '@entity/notification'
import { NotifLog } from '@entity/notifLog'
import { nanoid } from 'nanoid'
import schedule from 'node-schedule'
import { CustomJob } from '@graphql/CustomJob'
import { ApolloError } from 'apollo-server-errors'
import { lineBotPushTextMsg } from '@/utils/lineBotMsg'
import { NotifRepeatTypeEnum } from '@graphql/enum'
// import dayjs from 'dayjs'
// import numeral from 'numeral'

@EventSubscriber()
export class NotifEventSubscriber implements EntitySubscriberInterface<Notification> {
  private oldUid?: string = undefined

  listenTo() {
    return Notification
  }

  beforeInsert(event: InsertEvent<Notification>) {
    const notif = event.entity
    notif.uid = nanoid()
    notif.cronTimeString = this.formatCron(notif.notif_time, notif.repeatType)
  }

  beforeUpdate(event: UpdateEvent<Notification>) {
    const notif = event.entity!
    this.oldUid = notif.uid
    notif.uid = nanoid()
    notif.cronTimeString = this.formatCron(notif.notif_time, notif.repeatType)
  }

  async afterInsert(event: InsertEvent<Notification>) {
    this.setSchedule(event)
  }

  async afterUpdate(event: UpdateEvent<Notification>) {
    // 重設排程 -> 先刪掉排程
    await this.destroySchedule(this.oldUid)
    this.setSchedule(event)
  }

  // functions
  formatCron(time: Date, type: string) {
    let cronTime
    switch (type) {
      case NotifRepeatTypeEnum.never:
        cronTime = new Date(
          time.getFullYear(),
          time.getMonth(),
          time.getDate(),
          time.getHours(),
          time.getMinutes()
        ).toString()
      case NotifRepeatTypeEnum.every_day:
        cronTime = `${time.getMinutes()} ${time.getHours()} * * *`
      case NotifRepeatTypeEnum.every_week:
        cronTime = `${time.getMinutes()} ${time.getHours()} * * ${time.getDay()}`
      case NotifRepeatTypeEnum.every_month:
        cronTime = `${time.getMinutes()} ${time.getHours()} ${time.getDate()} * *`
      case NotifRepeatTypeEnum.every_year:
        cronTime = `${time.getMinutes()} ${time.getHours()} ${time.getDate()} ${time.getMonth() + 1} *`
    }
    if (!cronTime) {
      throw new ApolloError('FormatCron Fail', 'cron_undefined')
    }
    return cronTime
  }

  async setSchedule(event: InsertEvent<Notification> | UpdateEvent<Notification>) {
    const notifId = event.entity!.id
    const repo = event.manager
      .getRepository(Notification)
      .createQueryBuilder('Notification')
      .leftJoinAndSelect('Notification.event', 'event')
      .leftJoinAndSelect('event.user', 'user')
    const notif = await repo.where('Notification.id = :notifId', { notifId }).getOne()
    console.log()
    if (!notif) {
      throw new ApolloError('Notification Does Not Exist', 'notification_id_not_found')
    }
    this.setJob(notif)
  }

  setJob(notif: Notification) {
    let cronTimeString: string | Date = notif.cronTimeString
    if (notif.repeatType === NotifRepeatTypeEnum.never) {
      cronTimeString = new Date(cronTimeString)
    }
    const task: CustomJob = schedule.scheduleJob(cronTimeString, async () => {
      console.log('[', new Date().toLocaleString(), '] ', notif.message)
      try {
        await lineBotPushTextMsg(notif.event.user.lineUserId, notif.message)
        this.insertNotifLogData(notif)
      } catch (error) {
        console.log('[ERROR-setJob] ', error)
      }
    })
    task.uid = notif.uid
  }

  async destroySchedule(oldUid?: string) {
    // get all jobs and find the job which will be canceled
    const jobs = schedule.scheduledJobs
    // console.log('jobs', jobs)
    for (const [key, value] of Object.entries(jobs)) {
      const job = value as CustomJob
      if (job.uid === oldUid) {
        jobs[key].cancel()
        break
      }
    }
    // const newJobs = schedule.scheduledJobs
    // console.log('newJobs', newJobs)
    this.oldUid = undefined
  }

  async insertNotifLogData(notif: Notification) {
    const notification = await getRepository(Notification).findOneOrFail({ where: { uid: notif.uid } })
    const repo = getRepository(NotifLog)
    let notifLog = repo.create({
      cronTimeString: notif.cronTimeString,
      message: notif.message,
      actual_notif_time: new Date(),
      notification: { id: notification.id }
    })
    await repo.save(notifLog)
  }

  // async generateUid(event: InsertEvent<Notification>) {
  //   const notif = event.entity
  //   const today = new Date()
  //   const prefix = `NT-${dayjs(today).format('YYMM')}`
  //   const notifRepo = event.manager.getRepository(Notification)
  //   const counter = await notifRepo
  //     .createQueryBuilder('Notif')
  //     .andWhere('Notif.uid like :uid', { uid: `${prefix}%` })
  //     .getCount()
  //   const uid = `${prefix}${numeral(counter + 1).format('000')}`
  //   notif.uid = uid
  // }
}
