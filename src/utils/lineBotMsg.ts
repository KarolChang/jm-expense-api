import lineBotAPI from '@/apis/lineBot'

export const lineBotPushMsg = async (userId: string, text: string) => {
  try {
    const input: any = {
      to: userId,
      messages: {
        type: 'text',
        text
      }
    }
    await lineBotAPI.push(input)
  } catch (error) {
    console.error('[ERROR LineBot]', error)
  }
}
