import { getRepository } from 'typeorm'
import { Resolver, Query, Arg } from 'type-graphql'
import { Event } from '@entity/event'

@Resolver((of) => Event)
export class EventQuery {
  repo = getRepository(Event)

  @Query((returns) => [Event], { description: '依條件取得所有事件' })
  async events(@Arg('userId') userId?: number): Promise<Event[]> {
    const query = this.repo.createQueryBuilder('Event').leftJoin('Event.user', 'user')
    if (userId) {
      query.andWhere('user.id = :userId', { userId })
    }
    return query.getMany()
  }

  @Query((returns) => Event, { description: '依ID取得事件' })
  async event(@Arg('id') id: number, @Arg('userId') userId: number): Promise<Event | undefined> {
    return this.repo.findOneOrFail(id)
  }
}
