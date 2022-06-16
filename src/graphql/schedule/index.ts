import { NotificationQuery, NotifEventSubscriber } from '@entity/notification'
import schedule from 'node-schedule'

export const initSchedule = async () => {
  const NOTIFICATION_QUERY = new NotificationQuery()
  const notifs = await NOTIFICATION_QUERY.notificationsByType()
  const NOTIF_EVENT_SUBSCRIBER = new NotifEventSubscriber()
  for (const notif of notifs) {
    NOTIF_EVENT_SUBSCRIBER.setJob(notif)
  }
  const jobs = schedule.scheduledJobs
  console.log(`Jobs Length = ${Object.keys(jobs).length}`)
}
