import { getRepository } from 'typeorm'
import { Resolver, Mutation, Arg } from 'type-graphql'
import { Notification, NotificationInput } from '@entity/notification'

@Resolver((of) => Notification)
export class NotificationMutation {
  repo = getRepository(Notification)

  @Mutation((returns) => Notification, { description: '儲存通知' })
  async saveNotification(@Arg('notification') input: NotificationInput) {
    let notif = this.repo.create(input)
    return await this.repo.save(notif)
  }

  @Mutation((returns) => Notification, { description: '刪除通知' })
  async removeNotification(@Arg('id') id: number) {
    const notification = await this.repo.findOneOrFail(id)
    return this.repo.softRemove(notification)
  }
}
