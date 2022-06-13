import { JsonController, Get } from 'routing-controllers'
import schedule from 'node-schedule'

@JsonController()
export class ScheduleController {
  @Get('/schedule')
  async getJobs() {
    const jobs = schedule.scheduledJobs
    return {
      jobs,
      length: Object.keys(jobs).length
    }
  }
}
