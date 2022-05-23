import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm'
import { Notification } from '@entity/notification'
import { NotifLog } from '@entity/notifLog'
import { nanoid } from 'nanoid'
import cron, { getTasks, ScheduledTask } from 'node-cron'
import { ApolloError } from 'apollo-server-errors'
import { lineBotPushMsg } from '@/utils/lineBotMsg'
// import dayjs from 'dayjs'
// import numeral from 'numeral'

@EventSubscriber()
export class NotifEventSubscriber implements EntitySubscriberInterface<Notification> {
  listenTo() {
    return Notification
  }

  beforeInsert(event: InsertEvent<Notification>) {
    const notif = event.entity
    notif.uid = nanoid()
    notif.cronTimeString = this.validateCron(notif.notif_time)
  }

  beforeUpdate(event: UpdateEvent<Notification>) {
    const notif = event.entity!
    notif.uid = nanoid()
    notif.cronTimeString = this.validateCron(notif.notif_time)
  }

  async afterInsert(event: InsertEvent<Notification>) {
    this.setSchedule(event)
  }

  async afterUpdate(event: UpdateEvent<Notification>) {
    await this.destroySchedule()
    this.setSchedule(event)
  }

  // functions
  validateCron(time: Date) {
    const cronTime = `${time.getMinutes()} ${time.getHours()} ${time.getDate()} * *`
    if (!cron.validate(cronTime)) {
      throw new ApolloError('Cron Error', 'cronTime_invalid')
    }
    return cronTime
  }

  setSchedule(event: InsertEvent<Notification> | UpdateEvent<Notification>) {
    const notif = event.entity!
    const task: ScheduledTask = cron.schedule(notif.cronTimeString, async () => {
      console.log('[', new Date().toLocaleString(), '] ', notif.message)
      await lineBotPushMsg('Ub3557f7c812e4e78293959fe4fccd414', notif.message)
      this.insertNotifLogData(event)
    })
    // task.uid = notif.uid
  }

  async destroySchedule() {
    console.log('destroySchedule')
    // 若之前設過排程，先刪掉排程
    let tasks = getTasks()
  }

  async insertNotifLogData(event: InsertEvent<Notification> | UpdateEvent<Notification>) {
    const notif = event.entity!
    const notification = await event.manager.getRepository(Notification).findOneOrFail({ where: { uid: notif.uid } })
    const repo = event.manager.getRepository(NotifLog)
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
