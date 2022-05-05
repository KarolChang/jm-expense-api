import { getRepository } from 'typeorm'
import { Resolver, Mutation, Arg } from 'type-graphql'
import { Event, EventInput } from '@entity/event'
import { ApolloError } from 'apollo-server-errors'

@Resolver()
export class EventMutation {
  repo = getRepository(Event)

  @Mutation((returns) => Event, { description: '儲存事件' })
  async saveEvent(@Arg('event') input: EventInput) {
    let event = this.repo.create(input)
    return await this.repo.save(event)
  }

  @Mutation((returns) => Event, { description: '刪除事件' })
  async removeEvent(@Arg('id') id: number) {
    const event = await this.repo.findOne(id)
    if (!event) {
      throw new ApolloError('Entity ID Not Found', 'entity_id_not_found')
    } else {
      return this.repo.softRemove(event)
    }
  }
}
