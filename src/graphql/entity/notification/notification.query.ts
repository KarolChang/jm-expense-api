import { getRepository } from 'typeorm'
import { Resolver, Query, Arg } from 'type-graphql'
import { Notification } from '@entity/notification'
import { NotifTypeEnum } from '@graphql/enum'

@Resolver((of) => Notification)
export class NotificationQuery {
  repo = getRepository(Notification)

  @Query((returns) => [Notification], { description: '依type取得通知' })
  async notificationsByType(@Arg('type') type?: NotifTypeEnum): Promise<Notification[]> {
    const query = this.repo
      .createQueryBuilder('Notification')
      .leftJoinAndSelect('Notification.event', 'event')
      .leftJoinAndSelect('event.user', 'user')
      .leftJoinAndSelect('Notification.creator', 'creator')
    if (type) {
      query.andWhere('Notification.type = :type', { type })
    }
    return query.getMany()
  }

  @Query((returns) => [Notification], { description: '依user取得通知' })
  async notificationsByUser(@Arg('userId') userId?: number): Promise<Notification[]> {
    const query = this.repo
      .createQueryBuilder('Notification')
      .leftJoinAndSelect('Notification.event', 'event')
      .leftJoinAndSelect('event.user', 'user')
      .leftJoinAndSelect('Notification.creator', 'creator')
    if (userId) {
      query.orWhere('user.id = :userId', { userId }).orWhere('creator.id = :userId', { userId })
    }
    return query.getMany()
  }

  @Query((returns) => Notification, { description: '依ID取得通知' })
  async notification(@Arg('id') id: number): Promise<Notification | undefined> {
    return this.repo.findOneOrFail(id)
  }
}
