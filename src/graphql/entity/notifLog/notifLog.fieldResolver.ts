import { getRepository } from 'typeorm'
import { Resolver, FieldResolver, Root } from 'type-graphql'
import { Event } from '@entity/event'
import { NotifLog } from '@entity/notifLog'

@Resolver((of) => NotifLog)
export class NotifLogFieldResolver {
  @FieldResolver((type) => Event)
  async notification(@Root() root: NotifLog): Promise<Notification | undefined> {
    return await getRepository(Notification)
      .createQueryBuilder('Notification')
      .leftJoin('Notification.notifLogs', 'notifLogs')
      .where('notifLogs.id = :notifLogId', { notifLogId: root.id })
      .getOne()
  }
}
