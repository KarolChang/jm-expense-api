import { getRepository } from 'typeorm'
import { Resolver, FieldResolver, Root } from 'type-graphql'
import { Record } from '@entity/record'
import { RecordLog } from '@entity/recordLog'

@Resolver((of) => RecordLog)
export class RecordLogFieldResolver {
  @FieldResolver((type) => [Record])
  async records(@Root() root: RecordLog): Promise<Record[]> {
    return await getRepository(Record)
    .createQueryBuilder("Record")
    .leftJoinAndSelect("Record.recordLogs", "records")
    .getMany()
  }
}
