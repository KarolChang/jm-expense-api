import { getRepository } from 'typeorm'
import { Resolver, Mutation, Arg } from 'type-graphql'
import { Notification, NotificationInput } from '@entity/notification'
import { ApolloError } from 'apollo-server-errors'

@Resolver()
export class NotificationMutation {
  repo = getRepository(Notification)

  @Mutation((returns) => Notification, { description: '儲存通知' })
  async saveNotification(@Arg('notification') input: NotificationInput) {
    let notif = this.repo.create(input)
    return await this.repo.save(notif)
  }

  @Mutation((returns) => Notification, { description: '刪除通知' })
  async removeNotification(@Arg('id') id: number) {
    const notif = await this.repo.findOne(id)
    if (!notif) {
      throw new ApolloError('Entity ID Not Found', 'entity_id_not_found')
    } else {
      return this.repo.softRemove(notif)
    }
  }
}
