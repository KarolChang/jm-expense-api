import { Client, ClientConfig } from '@line/bot-sdk'

const config: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.CHANNEL_SECRET
}

export const LINE: Client = new Client(config)
