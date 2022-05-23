import { Query, Resolver, Arg, Authorized } from 'type-graphql'
import { Log } from '@entity/log'
import { getRepository } from 'typeorm'

@Resolver((of) => Log)
export class LogQuery {
  repo = getRepository(Log)

  @Authorized('admin')
  @Query((returns) => Log, { description: '依ID取得' })
  log(@Arg('id') id: number): Promise<Log | undefined> {
    return this.repo.findOneOrFail(id)
  }

  @Authorized('admin')
  @Query((returns) => [Log], { description: '依UUID取得' })
  logsByUUID(@Arg('uuid') uuid: string): Promise<Log[]> {
    return this.repo.find({ where: { uuid } })
  }
}
