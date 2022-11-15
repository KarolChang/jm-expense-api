import { getCustomRepository, EntityRepository, Repository } from 'typeorm'
import { createParamDecorator } from 'type-graphql'
import { InjectData } from '@/decorators/InjectData'
import { CustomContext } from '@graphql/auth/customContext'
import { Record, RecordInput } from '@entity/record'
import dayjs from 'dayjs'
import { AmountByMonth } from './record.type'

@InjectData()
@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
  ctx: CustomContext
  log: boolean = false

  queryBuilder() {
    return this.createQueryBuilder('Record').orderBy('Record.createdAt')
  }

  // 計算當月總額
  async totalAmountByMonth(year_month?: string) {
    const yearMonth = year_month ? year_month : dayjs().format('YYYY-MM')
    const amount = new AmountByMonth(yearMonth)
    const { totalAmount } = await this.queryBuilder()
      .where('Record.date like :keyword', { keyword: `${yearMonth}%` })
      // .where('Record.date like :keyword', { keyword: `2022-11%` })
      .select('SUM(Record.amount)', 'totalAmount')
      .getRawOne()
    const { closedAmount } = await this.queryBuilder()
      .select('SUM(Record.amount)', 'closedAmount')
      .where('Record.date like :keyword', { keyword: `${yearMonth}%` })
      .andWhere('Record.isClosed = true')
      .getRawOne()
    amount.totalAmount = totalAmount === null ? 0 : totalAmount
    amount.closedAmount = closedAmount === null ? 0 : closedAmount
    return amount
  }

  // 結算
  async close(records: RecordInput[]) {
    const recordIds = records.map((e: RecordInput) => e.id)
    return this.update(recordIds, { isClosed: true })
  }
}

export const getRecordRepo = () => getCustomRepository(RecordRepository)

export const Repo = () => {
  return createParamDecorator(({ context }) => {
    const repo = getRecordRepo()
    repo.ctx = context as CustomContext
    return repo
  })
}
