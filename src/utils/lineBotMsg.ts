import { LINE } from '@/graphql/line/LINE'
import { LineLog } from '@entity/lineLog'
import { nanoid } from 'nanoid'
import { TextMessage } from '@line/bot-sdk'
import { LineActionEnum } from '@graphql/enum'
import { getRepository } from 'typeorm'

export const lineBotSendMsg = async (text: string, sendType: LineActionEnum, userId: string | string[]) => {
  const lineLogRepo = getRepository(LineLog)
  const message: TextMessage = {
    type: 'text',
    text
  }
  try {
    let lineLog
    // push msg
    switch (sendType) {
      case LineActionEnum.pushMessage:
        await LINE.pushMessage(userId as string, message)
        lineLog = new LineLog(nanoid(), userId, message, LineActionEnum.pushMessage)
        break
      case LineActionEnum.multicast:
        await LINE.multicast(userId as string[], message)
        lineLog = new LineLog(nanoid(), userId, message, LineActionEnum.multicast)
        break
      default:
        break
    }
    // lineLog
    if (lineLog) {
      await lineLogRepo.save(lineLog)
    }
  } catch (error) {
    console.log('[ERROR LineBot]', error)
    // lineLog
    const lineLog = new LineLog(nanoid(), userId, message, LineActionEnum.pushMessage, error)
    await lineLogRepo.save(lineLog)
  }
}
