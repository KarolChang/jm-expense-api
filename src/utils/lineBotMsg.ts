import { LINE } from '@graphql/line/LINE'
import { LineLog } from '@entity/lineLog'
import { nanoid } from 'nanoid'
import { TextMessage } from '@line/bot-sdk'
import { LineActionEnum } from '@graphql/enum'
import { getRepository } from 'typeorm'

export const lineBotPushTextMsg = async (userId: string, text: string) => {
  const lineLogRepo = getRepository(LineLog)
  const message: TextMessage = {
    type: 'text',
    text
  }
  try {
    // push msg
    await LINE.pushMessage(userId, message)
    // lineLog
    const lineLog = new LineLog(nanoid(), userId, message, LineActionEnum.pushMessage)
    await lineLogRepo.save(lineLog)
  } catch (error) {
    console.log('[ERROR LineBot]', error)
    // lineLog
    const lineLog = new LineLog(nanoid(), userId, message, LineActionEnum.pushMessage, error)
    await lineLogRepo.save(lineLog)
  }
}
