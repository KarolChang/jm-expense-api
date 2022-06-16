import { Resolver, Mutation, Arg, Authorized } from 'type-graphql'
import { Event, EventInput, EventRepository, Repo } from '@entity/event'

@Resolver((of) => Event)
export class EventMutation {
  @Authorized()
  @Mutation((returns) => Event, { description: '儲存事件' })
  async saveEvent(@Repo() repo: EventRepository, @Arg('event') input: EventInput) {
    let event = repo.create(input)
    return await repo.save(event)
  }

  @Authorized()
  @Mutation((returns) => Event, { description: '刪除事件' })
  async removeEvent(@Repo() repo: EventRepository, @Arg('id') id: number) {
    const event = await repo.findOneOrFail(id)
    return repo.remove(event)
  }
}
