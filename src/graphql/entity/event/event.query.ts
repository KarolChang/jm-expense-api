import { Resolver, Query, Arg, Authorized } from 'type-graphql'
import { Event, EventRepository, Repo } from '@entity/event'

@Resolver((of) => Event)
export class EventQuery {
  @Authorized('admin')
  @Query((returns) => [Event], { description: '依條件取得所有事件' })
  async events(@Repo() repo: EventRepository, @Arg('userId') userId?: number): Promise<Event[]> {
    const query = repo.queryBuilder().leftJoin('Event.user', 'user')
    if (userId) {
      query.andWhere('user.id = :userId', { userId })
    }
    return query.getMany()
  }

  @Authorized('admin')
  @Query((returns) => Event, { description: '依ID取得事件' })
  async event(@Repo() repo: EventRepository, @Arg('id') id: number): Promise<Event | undefined> {
    return repo.findOneOrFail(id)
  }

  @Authorized()
  @Query((returns) => [Event], { description: '依當前使用者取得事件' })
  async eventsByUser(@Repo() repo: EventRepository): Promise<Event[]> {
    return repo.getByUser()
  }

  @Authorized()
  @Query((returns) => Event, { description: '依當前使用者 & ID取得事件' })
  async eventByUserAndId(@Repo() repo: EventRepository, @Arg('id') id: number): Promise<Event | undefined> {
    return repo.getByUserAndId(id)
  }
}
