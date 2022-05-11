import { getRepository } from 'typeorm'
import { Resolver, FieldResolver, Root } from 'type-graphql'
import { Event } from '@entity/event'
import { Notification } from '@entity/notification'

@Resolver((of) => Notification)
export class NotificationFieldResolver {
  @FieldResolver((type) => Event)
  async event(@Root() root: Notification): Promise<Event | undefined> {
    return await getRepository(Event)
      .createQueryBuilder('Event')
      .leftJoin('Event.notifications', 'notifications')
      .where('notifications.id = :notificationId', { notificationId: root.id })
      .getOne()
  }
}
