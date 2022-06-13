import { getRepository } from 'typeorm'
import { Resolver, Query, Arg } from 'type-graphql'
import { Notification } from '@entity/notification'

@Resolver((of) => Notification)
export class NotificationQuery {
  repo = getRepository(Notification)

  @Query((returns) => [Notification], { description: '依條件取得通知' })
  async notifications(@Arg('eventId') eventId?: number, @Arg('userId') userId?: number): Promise<Notification[]> {
    const query = this.repo
      .createQueryBuilder('Notification')
      .leftJoinAndSelect('Notification.event', 'event')
      .leftJoinAndSelect('event.user', 'user')
    if (eventId) {
      query.andWhere('event.id = :eventId', { eventId })
    }
    if (userId) {
      query.andWhere('user.id = :userId', { userId })
    }
    return query.getMany()
  }

  @Query((returns) => Notification, { description: '依ID取得通知' })
  async notification(@Arg('id') id: number): Promise<Notification | undefined> {
    return this.repo.findOneOrFail(id)
  }
}
