import { Service } from 'typedi'
import LineInfo from '@/graphql/entity/line/LineInfo'
import { AccountLinkEvent } from '@line/bot-sdk'
import { Base64 } from 'js-base64'
import { linkedTemplate } from '@/graphql/entity/line/lineTemplate'
import { ApolloError } from 'apollo-server-errors'
import { getUserRepo } from '@entity/user'

@Service('LineAccountLink')
export class LineAccountLink extends LineInfo {
  async push() {
    const LINE = this.line
    const event = this.event as AccountLinkEvent
    if (event.link.result === 'ok') {
      const email = Base64.decode(event.link.nonce)
      const lineUserId = event.source.userId!
      // 儲存使用者的 lineUserId
      await getUserRepo().bindLineUserId(email, lineUserId)
      // 傳送訊息
      const echo = linkedTemplate()
      LINE.replyMessage(event.replyToken, echo)
    } else {
      throw new ApolloError('Line Account Link Error', 'link_result_error')
    }
  }
}
