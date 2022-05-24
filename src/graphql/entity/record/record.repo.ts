import { getCustomRepository, EntityRepository, Repository } from 'typeorm'
import { createParamDecorator } from 'type-graphql'
import { InjectData } from '@/decorators/InjectData'
import { CustomContext } from '@graphql/auth/customContext'
import { Record } from '@entity/record'
import { ApolloError } from 'apollo-server-errors'
import dayjs from 'dayjs'
import { AmountByMonth } from './record.type'

@InjectData()
@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
  ctx: CustomContext
  log: boolean = true

  queryBuilder() {
    return this.createQueryBuilder('Record').orderBy('Record.createdAt')
  }

  // 計算當月總額
  async totalAmountByMonth(year_month?: string) {
    const yearMonth = year_month ? year_month : dayjs().format('YYYY-MM')
    const amount = new AmountByMonth(yearMonth)
    const { totalAmount } = await this.queryBuilder()
      .select('SUM(Record.amount)', 'totalAmount')
      .where('Record.date like :keyword', { keyword: `${year_month}%` })
      .getRawOne()
    const { closedAmount } = await this.queryBuilder()
      .select('SUM(Record.amount)', 'closedAmount')
      .where('Record.date like :keyword', { keyword: `${year_month}%` })
      .andWhere('Record.isClosed = true')
      .getRawOne()
    amount.totalAmount = totalAmount
    amount.closedAmount = closedAmount
    return amount
  }

  // 結算
  // async close() {}
}

export const getRecordRepo = () => getCustomRepository(RecordRepository)

export const Repo = () => {
  return createParamDecorator(({ context }) => {
    const repo = getRecordRepo()
    repo.ctx = context as CustomContext
    return repo
  })
}
