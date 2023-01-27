import { Service } from 'typedi'
import { MsgInfo } from '@/graphql/entity/MsgInfo'
import { Record } from '@entity/record'
import { LineLog } from '@entity/lineLog'
import { LINE } from '@/graphql/line/LINE'
import { ApolloError } from 'apollo-server-errors'
import { RecordMutation } from './record.mutation'
import { nanoid } from 'nanoid'
import { LineActionEnum } from '@graphql/enum'
import { Message } from '@line/bot-sdk'
import appMsgApi from '@/apis/appMsg.api'
import { getNickName } from '@/utils/nickName'

@Service('Record_Msg')
export class RecordLineMsg extends MsgInfo<Record> {
  async push() {
    const res = await this.lineMsg()
    await this.lineLog(res)
    await this.AppMsg()
  }

  text: string = ''

  async lineMsg() {
    try {
      // const to = [process.env.JIANMIAU_USERID!, process.env.KAROL_USERID!]
      const to = [process.env.KAROL_USERID!]
      const RECORD_MUTATION = new RecordMutation()
      const fieldName = this.ctx.info!.fieldName
      let text = getNickName(this.ctx.user!.email)
      const { merchant, item, amount } = this.entity
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
        case RECORD_MUTATION.closeRecord.name: {
          return null
        }
        default:
          break
      }

      text += `${merchant}-${item} $${amount}`
      this.text = text
      const message: Message = { type: 'text', text }
      await LINE.multicast(to, message)
      return { status: 'success', data: { to, message, action: LineActionEnum.multicast } }
    } catch (error) {
      return { status: 'error', error }
    }
  }

  async lineLog(res: any) {
    if (res === null) return
    const { to, message, action } = res.data
    let lineLog
    lineLog = new LineLog(nanoid(), to, message, action)
    const lineLogRepo = this.manager.getRepository(LineLog)
    await lineLogRepo.save(lineLog)
  }

  async AppMsg() {
    await appMsgApi.send(this.text)
  }
}
