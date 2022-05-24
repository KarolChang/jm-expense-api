import { Resolver, Mutation, Arg, Authorized } from 'type-graphql'
import { Record, RecordInput, RecordRepository, Repo } from '@entity/record'

@Resolver((of) => Record)
export class RecordMutation {
  @Authorized()
  @Mutation((returns) => Record, { description: '儲存' })
  async saveRecord(@Repo() repo: RecordRepository, @Arg('record') input: RecordInput) {
    let record = repo.create(input)
    return await repo.save(record)
  }

  @Authorized()
  @Mutation((returns) => Record, { description: '刪除' })
  async removeRecord(@Repo() repo: RecordRepository, @Arg('id') id: number) {
    const record = await repo.findOneOrFail(id)
    return repo.softRemove(record)
  }

  // @Authorized()
  // @Mutation((returns) => Record, { description: '結算' })
  // async closeRecord(@Repo() repo: RecordRepository, @Arg('record') input: RecordInput) {
  //   return repo.close()
  // }
}
