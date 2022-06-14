import { Controller, Get, Res } from 'routing-controllers'

@Controller()
export class BasicController {
  @Get('/')
  async basic(@Res() res: any) {
    return res.send('Hello! Here is JM-Expense-Graphql API~')
  }
}
