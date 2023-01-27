import { getRepository } from 'typeorm'
import { Resolver, FieldResolver, Root } from 'type-graphql'
import { Record } from '@entity/record'
import { RecordLog } from '@entity/recordLog'
import { User } from '@entity/user'

@Resolver((of) => RecordLog)
export class RecordLogFieldResolver {
  @FieldResolver((type) => [Record])
  async records(@Root() root: RecordLog): Promise<Record[]> {
    return await getRepository(Record)
    .createQueryBuilder("Record")
    .leftJoinAndSelect("Record.recordLogs", "records")
    .getMany()
  }

  @FieldResolver((type) => User)
  async user(@Root() root: RecordLog): Promise<User | undefined> {
    return await getRepository(User)
    .createQueryBuilder("User")
    .leftJoinAndSelect("User.recordLogs", "recordLogs")
    .where('recordLogs.id = :recordLogId', { recordLogId: root.id })
    .getOne()
  }
}
