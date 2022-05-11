import { getRepository } from 'typeorm'
import { Resolver, Query, Arg } from 'type-graphql'
import { Notification } from '@entity/notification'

@Resolver()
export class NotificationQuery {
  repo = getRepository(Notification).createQueryBuilder('Notification')

  @Query((returns) => [Notification], { description: '依條件取得通知' })
  async notifications(@Arg('eventId') eventId?: number, @Arg('userId') userId?: number): Promise<Notification[]> {
    // const query = this.repo.leftJoin('Notification.event', 'event')
    // .leftJoin('event.user', 'user')
    // if (eventId) {
    //   query.andWhere('Notification.event.id = :eventId', { eventId })
    // }
    // if (userId) {
    //   query.andWhere('user.id = :userId', { userId })
    // }
    // return query.getMany()
    return this.repo.getMany()
  }

  @Query((returns) => Notification, { description: '依ID取得通知' })
  async notification(@Arg('id') id: number): Promise<Notification | undefined> {
    return this.repo.where('Notification.id = :id', { id }).getOneOrFail()
  }
}
