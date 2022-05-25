import { Service } from 'typedi'
import { LineMessage } from '@entity/LineMessage'
import { Record } from '@entity/record'
import { LineLog } from '@entity/lineLog'
import { LINE } from '@/line/LINE'
import { ApolloError } from 'apollo-server-errors'
import { RecordMutation } from './record.mutation'
import { nanoid } from 'nanoid'
import { LineActionEnum } from '@graphql/enum'
import { Message } from '@line/bot-sdk'

@Service('Record_LineMsg')
export class RecordLineMsg extends LineMessage<Record> {
  async push() {
    const res = await this.lineMsg()
    await this.lineLog(res)
  }

  async lineMsg() {
    try {
      // const to = [process.env.JIANMIAU_USERID!, process.env.KAROL_USERID!]
      const to = [process.env.KAROL_USERID!]

      const RECORD_MUTATION = new RecordMutation()
      const fieldName = this.ctx.info!.fieldName
      console.log('fieldName!!!', fieldName)
      console.log('name!!!', RECORD_MUTATION.saveRecord.name)
      let text = this.ctx.user!.displayName
      switch (fieldName) {
        case RECORD_MUTATION.saveRecord.name: {
          if (this.action === 'INSERT') {
            text += '新增了一筆紀錄 →\n'
          } else {
            text += '編輯了一筆紀錄 →\n'
          }
          break
        }
        case RECORD_MUTATION.removeRecord.name: {
          text += '刪除了一筆紀錄 →\n'
          break
        }
        default:
          break
      }

      const { merchant, item, amount } = this.entity
      text += `${merchant}-${item} $${amount}`
      const message: Message = { type: 'text', text }
      await LINE.multicast(to, message)
      return { status: 'success', data: { to, message, action: LineActionEnum.multicast } }
    } catch (error) {
      return { status: 'error', error }
    }
  }

  async lineLog(res: any) {
    console.log('res!!!', res)
    const { to, message, action } = res.data
    let lineLog
    lineLog = new LineLog(nanoid(), to, message, action)
    const lineLogRepo = this.manager.getRepository(LineLog)
    if (res.status === 'error') {
      lineLog = new LineLog(nanoid(), to, message, action, res.error)
      await lineLogRepo.save(lineLog)
      throw new ApolloError('LineMsg Error', 'line_message_error')
    }

    console.log('lineLog!!!', lineLog)
    await lineLogRepo.save(lineLog)
  }
}
