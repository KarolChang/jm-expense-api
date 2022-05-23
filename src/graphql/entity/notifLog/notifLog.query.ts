import { getRepository } from 'typeorm'
import { Resolver, Query, Arg } from 'type-graphql'
import { NotifLog } from '@entity/notifLog'

@Resolver((of) => NotifLog)
export class NotifLogQuery {
  repo = getRepository(NotifLog)

  @Query((returns) => [NotifLog], { description: '依條件取得通知紀錄' })
  async notifLogs(
    @Arg('notificationId') notificationId?: number,
    @Arg('eventId') eventId?: number,
    @Arg('userId') userId?: number
  ): Promise<NotifLog[]> {
    const query = this.repo
      .createQueryBuilder('NotifLog')
      .leftJoin('NotifLog.notification', 'notification')
      .leftJoin('notification.event', 'event')
      .leftJoin('event.user', 'user')
    if (notificationId) {
      query.andWhere('notification.id = :notificationId', { notificationId })
    }
    if (eventId) {
      query.andWhere('event.id = :eventId', { eventId })
    }
    if (userId) {
      query.andWhere('user.id = :userId', { userId })
    }
    return query.getMany()
  }

  @Query((returns) => NotifLog, { description: '依ID取得通知' })
  async notifLog(@Arg('id') id: number): Promise<NotifLog | undefined> {
    return this.repo.findOneOrFail(id)
  }
}
