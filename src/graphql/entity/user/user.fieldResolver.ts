import { getRepository } from 'typeorm'
import { Resolver, FieldResolver, Root } from 'type-graphql'
import { User } from '@entity/user'
import { Event } from '@entity/event'

@Resolver((of) => User)
export class UserFieldResolver {
  @FieldResolver()
  async events(@Root() root: User): Promise<Event[]> {
    return await getRepository(Event)
      .createQueryBuilder('Event')
      .leftJoin('Event.user', 'user')
      .where('user.id = :userId', { userId: root.id })
      .getMany()
  }
}
