import { getRepository } from 'typeorm'
import { Resolver, FieldResolver, Root } from 'type-graphql'
import { User } from '@entity/user'
import { Event } from '@entity/event'
import { Bank } from '@entity/bank'
import { Notification } from '@entity/notification'

@Resolver((of) => Event)
export class EventFieldResolver {
  @FieldResolver((type) => User)
  async user(@Root() root: Event): Promise<User | undefined> {
    return await getRepository(User)
      .createQueryBuilder('User')
      .leftJoin('User.events', 'events')
      .where('events.id = :eventId', { eventId: root.id })
      .getOne()
  }

  @FieldResolver((type) => Bank)
  async bank(@Root() root: Event): Promise<Bank | undefined> {
    return await getRepository(Bank)
      .createQueryBuilder('Bank')
      .leftJoin('Bank.events', 'events')
      .where('events.id = :eventId', { eventId: root.id })
      .getOne()
  }

  @FieldResolver((type) => [Notification])
  async notifications(@Root() root: Event): Promise<Notification[]> {
    return await getRepository(Notification)
      .createQueryBuilder('Notification')
      .leftJoin('Notification.event', 'event')
      .andWhere('event.id = :eventId', { eventId: root.id })
      .getMany()
  }
}
