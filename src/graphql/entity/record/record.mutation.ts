import { Resolver, Mutation, Arg, Authorized } from 'type-graphql'
import { Record, RecordInput, RecordRepository, Repo } from '@entity/record'
import { RecordLog, RecordLogInfo } from '@entity/recordLog'
import { LineActionEnum, RecordLogActionEnum } from '@/graphql/enum'
import { getRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-errors'
import { Message } from '@line/bot-sdk'
import { LINE } from '@/graphql/line/LINE'
import { LineLog } from '@entity/lineLog'
import { nanoid } from 'nanoid'

@Resolver((of) => Record)
export class RecordMutation {
  @Authorized()
  @Mutation((returns) => Record, { description: '儲存' })
  async saveRecord(@Repo() repo: RecordRepository, @Arg('record') input: RecordInput) {
    // TODO: 已經結算的紀錄不能被編輯
    // TEST: 紀錄不存在的話...噴錯？
    let record = repo.create(input)
    return await repo.save(record, { data: { ctx: repo.ctx } })
  }

  @Authorized()
  @Mutation((returns) => Record, { description: '刪除' })
  async removeRecord(@Repo() repo: RecordRepository, @Arg('id') id: number) {
    const record = await repo.findOneOrFail(id)
    return repo.softRemove(record, { data: { ctx: repo.ctx } })
  }

  @Authorized()
  @Mutation((returns) => [Record], { description: '結算' })
  async closeRecord(@Repo() repo: RecordRepository, @Arg('records', (type) => [RecordInput]) records: RecordInput[], @Arg('amount') amount: number) {
    // 金額是否正確？
    const isAmountOK = await repo.checkCloseAmount(records, amount)
    if(!isAmountOK) throw new ApolloError('Close Error', 'amount_error')

    // 結算
    const handledRecords = records.map((record) => ({ ...record, isClosed: true }))
    const allRecords = repo.create(handledRecords)
    const recordArray = await repo.save(allRecords, { data: { ctx: repo.ctx } })

    // 寫 recordLog
    const recordLogRepo = getRepository(RecordLog)
    const recordLog = new RecordLog('CLOSE' as RecordLogActionEnum, {closedAmount: amount} as RecordLogInfo, repo.ctx.user!, recordArray)
    await recordLogRepo.save(recordLog, { listeners: false })

    // line訊息
    const to = [process.env.KAROL_USERID!]
    const text = `${repo.ctx.user?.displayName}結算紀錄 →\n總金額 $${amount}`
    const message: Message = { type: 'text', text }
    await LINE.multicast(to, message)
    // line log
    const lineLog = new LineLog(nanoid(), to, message, LineActionEnum.multicast)
    const lineLogRepo = getRepository(LineLog)
    await lineLogRepo.save(lineLog)

    return recordArray
  }
}