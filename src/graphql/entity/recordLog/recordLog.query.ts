import { Query, Resolver, Arg, Authorized } from 'type-graphql'
import { RecordLog } from '@entity/recordLog'
import { getRepository } from 'typeorm'

@Resolver((of) => RecordLog)
export class RecordLogQuery {
  repo = getRepository(RecordLog)

  @Authorized()
  @Query((returns) => [RecordLog], { description: '依Action取得' })
  recordLogs(@Arg('action') action?: string): Promise<RecordLog[]> {
    if (!action) return this.repo.find()
    return this.repo.find({ where: { action } })
  }
}
