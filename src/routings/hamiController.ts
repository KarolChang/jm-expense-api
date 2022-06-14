import { JsonController, Get, Res, Req, Param } from 'routing-controllers'
import HamiAPI from '@/apis/hami'

@JsonController('/hami')
export class HamiController {
  @Get('/:team')
  async getHamiUrl(@Res() res: any, @Param('team') team: string) {
    const index = this.teamCode.indexOf(team)
    const { data } = await HamiAPI.getLiveUrl((this.basicCode + index).toString())
    return res.json({
      url: data.url
    })
  }

  // 常數
  readonly basicCode: number = 1975
  readonly teamCode: string[] = ['統一7-ELEVEn獅', '中信兄弟', '味全龍', '富邦悍將', '樂天桃猿']
}
