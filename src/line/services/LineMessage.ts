import { Service } from 'typedi'
import LineInfo from '@/line/LineInfo'
import { MessageEvent, EventMessage, Message } from '@line/bot-sdk'
import { linkTemplate, unlinkedTemplate } from '@/line/lineTemplate'
import { getRepository } from 'typeorm'
import { User } from '@entity/user'
import { ApolloError } from 'apollo-server-errors'

@Service('LineMessage')
export class LineMessage extends LineInfo {
  async push() {
    const LINE = this.line
    const event = this.event as MessageEvent
    const msg: EventMessage = event.message

    if (msg.type === 'text') {
      let echo
      switch (msg.text) {
        case '開始連動':
          const linkToken = await LINE.getLinkToken(event.source.userId!)
          echo = linkTemplate(linkToken)
          break
        case '取消連動':
          const lineUserId = event.source.userId
          await this.unlink(lineUserId!)
          echo = unlinkedTemplate()
          break
        default:
          echo = { type: 'text', text: '阿巴阿巴' }
      }
      LINE.replyMessage(event.replyToken, echo as Message)
    }
  }

  async unlink(lineUserId: string) {
    const userRepo = getRepository(User)
    const user = await userRepo.findOne({ where: { lineUserId, active: true } })
    if (!user) {
      throw new ApolloError('Line Unlink Error', 'user_lineUserId_error')
    }
    await userRepo.save({ ...user, lineUserId: '' })
  }
}
