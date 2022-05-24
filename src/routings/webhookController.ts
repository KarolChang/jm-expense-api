import { Body, Controller, Post } from 'routing-controllers'
import { WebhookRequestBody, WebhookEvent } from '@line/bot-sdk'
import { LINE } from '@/utils/LINE'

@Controller()
export class WebhookController {
  @Post('/webhook')
  async lineWebhook(@Body() body: WebhookRequestBody) {
    console.log('body!!!', body)
    const events: WebhookEvent[] = body.events

    const results = await Promise.all(
      events.map((event: WebhookEvent) => {
        if (event.type === 'message' && event.message.type === 'text') {
          console.log('這是message')
          LINE.replyMessage(event.replyToken, { type: 'text', text: `哈哈哈 ${event.message.text}` })
        }
      })
    )

    return { status: 'success', results }
  }
}
