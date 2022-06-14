import { JsonController, Get } from 'routing-controllers'
import schedule from 'node-schedule'
import { CustomJob } from '@/graphql/CustomJob'

@JsonController('/schedule')
export class ScheduleController {
  @Get('/')
  async getJobs() {
    const jobs = schedule.scheduledJobs
    const results = []
    for (const val of Object.values(jobs)) {
      const job = val as CustomJob
      results.push({ uid: job.uid, name: job.name })
    }
    return {
      results,
      length: results.length
    }
  }
}
