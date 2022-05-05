import { getRepository } from 'typeorm'
import { Resolver, Query, Arg } from 'type-graphql'
import { Event } from '@entity/event'

@Resolver()
export class EventQuery {
  repo = getRepository(Event).createQueryBuilder('Event')

  @Query((returns) => [Event], { description: '依條件取得所有事件' })
  async events(): Promise<Event[]> {
    return this.repo.getMany()
  }

  @Query((returns) => Event, { description: '依ID取得事件' })
  async event(@Arg('id') id: number): Promise<Event | undefined> {
    return this.repo.where('Event.id = :id', { id }).getOneOrFail()
  }
}
