import { getRepository } from 'typeorm'
import { Resolver, Query, Arg } from 'type-graphql'
import { Bank } from '@entity/bank'

@Resolver()
export class BankQuery {
  repo = getRepository(Bank).createQueryBuilder('Bank')

  @Query((returns) => [Bank], { description: '依條件取得所有銀行機構' })
  async banks(): Promise<Bank[]> {
    return this.repo.getMany()
  }

  @Query((returns) => Bank, { description: '依id取得銀行機構' })
  async bank(@Arg('id') id: number): Promise<Bank | undefined> {
    return this.repo.where('Bank.id = :id', { id }).getOneOrFail()
  }

  @Query((returns) => Bank, { description: '依代碼(code)取得銀行機構' })
  async bankByCode(@Arg('code') code: string): Promise<Bank | undefined> {
    return this.repo.where('Bank.code = :code', { code }).getOneOrFail()
  }
}