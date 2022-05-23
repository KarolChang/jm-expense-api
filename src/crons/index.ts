// import cron, { getTasks, ScheduledTask } from 'node-cron'
// import { Notification } from '@entity/notification'
// import { ApolloError } from 'apollo-server-errors'
// import { lineBotPushMsg } from '@/utils/lineBotMsg'
// import { getRepository } from 'typeorm'
// import { NotifLog } from '@entity/notifLog'

// export const validateCron = (time: Date) => {
//   const cronTime = `${time.getMinutes()} ${time.getHours()} ${time.getDate()} * *`
//   if (!cron.validate(cronTime)) {
//     throw new ApolloError('cron has problem', 'cronTime invalid')
//   }
//   return cronTime
// }

// export const setSchedule = (notif: Notification) => {
//   // 若之前設過排程，先刪掉排程
//   if (notif.id) {
//     // 查看排程
//     let tasks = getTasks()
//     // tasks = tasks.filter((task: ScheduledTask) => task.uid !== notif.uid)
//   }
//   // 設定排程
//   const task: ScheduledTask = cron.schedule(notif.cronTimeString, async () => {
//     console.log('[', new Date().toLocaleString(), '] ', notif.message)
//     // lineBot傳訊息
//     await lineBotPushMsg('Ub3557f7c812e4e78293959fe4fccd414', notif.message)
//     // 新增 notifLog 資料
//     const repo = getRepository(NotifLog)
//     const notification = await getRepository(Notification).findOneOrFail({ where: { uid: notif.uid } })
//     let notifLog = repo.create({
//       cronTimeString: notif.cronTimeString,
//       message: notif.message,
//       actual_notif_time: new Date(),
//       notification: { id: notification.id }
//     })
//     await repo.save(notifLog)
//     console.log('notifLog!!!', notifLog)
//   })
//   task.uid = notif.uid
//   console.log('[task]', task)
//   console.log('getTasks', getTasks())
// }

// export const updateSchedule = (notif: Notification) => {
//   getTasks()
// }
