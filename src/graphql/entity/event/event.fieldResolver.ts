import { getRepository } from 'typeorm'
import { Resolver, FieldResolver, Root } from 'type-graphql'
import { User } from '@entity/user'
import { Event } from '@entity/event'

@Resolver((of) => Event)
export class EventFieldResolver {
  @FieldResolver()
  async user(@Root() root: Event): Promise<User | undefined> {
    return await getRepository(User)
      .createQueryBuilder('User')
      .leftJoin('User.events', 'events')
      .where('events.id = :eventId', { eventId: root.id })
      .getOne()
  }

  @FieldResolver()
  async notifications(@Root() root: Event): Promise<Notification[]> {
    return await getRepository(Notification)
      .createQueryBuilder('Notification')
      .leftJoin('Notification.event', 'event')
      .where('event.id = :eventId', { eventId: root.id })
      .getMany()
  }
}
