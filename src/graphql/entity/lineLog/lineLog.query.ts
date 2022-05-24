import { Query, Resolver, Arg, Authorized } from 'type-graphql'
import { LineLog } from '@entity/lineLog'
import { getRepository } from 'typeorm'

@Resolver((of) => LineLog)
export class LineLogQuery {
  repo = getRepository(LineLog)

  @Authorized('admin')
  @Query((returns) => LineLog, { description: '依ID取得' })
  log(@Arg('id') id: number): Promise<LineLog | undefined> {
    return this.repo.findOneOrFail(id)
  }

  @Authorized('admin')
  @Query((returns) => [LineLog], { description: '依UUID取得' })
  logsByUUID(@Arg('uuid') uuid: string): Promise<LineLog[]> {
    return this.repo.find({ where: { uuid } })
  }
}
