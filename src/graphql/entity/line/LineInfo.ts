import { Client, WebhookEvent } from '@line/bot-sdk'

export default class LineInfo {
  line: Client
  event: WebhookEvent

  push() {}
}
