import { getRepository } from 'typeorm'
import { Resolver, Mutation, Arg } from 'type-graphql'
import { NotifLog, NotifLogInput } from '@entity/notifLog'

@Resolver((of) => NotifLog)
export class NotifLogMutation {
  repo = getRepository(NotifLog)

  @Mutation((returns) => NotifLog, { description: '儲存通知紀錄' })
  async saveNotifLog(@Arg('notifLog') input: NotifLogInput) {
    let notifLog = this.repo.create(input)
    return await this.repo.save(notifLog)
  }

  @Mutation((returns) => NotifLog, { description: '刪除通知紀錄' })
  async removeNotifLog(@Arg('id') id: number) {
    const notifLog = await this.repo.findOneOrFail(id)
    return this.repo.softRemove(notifLog)
  }
}
