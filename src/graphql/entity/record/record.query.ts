import { Resolver, Query, Arg, Authorized } from 'type-graphql'
import { Record, RecordRepository, Repo, AmountByMonth } from '@entity/record'

@Resolver((of) => Record)
export class RecordQuery {
  @Authorized()
  @Query((returns) => [Record], { description: '依條件取得' })
  async records(@Repo() repo: RecordRepository): Promise<Record[]> {
    const query = repo.queryBuilder()
    return query.getMany()
  }

  @Authorized()
  @Query((returns) => Record, { description: '依ID取得' })
  async record(@Repo() repo: RecordRepository, @Arg('id') id: number): Promise<Record | undefined> {
    return repo.findOneOrFail(id)
  }

  @Authorized()
  @Query((returns) => AmountByMonth, { description: '計算月總額' })
  async recordsAmountByMonth(
    @Repo() repo: RecordRepository,
    @Arg('year_month') year_month?: string
  ): Promise<AmountByMonth> {
    return repo.totalAmountByMonth(year_month)
  }
}
