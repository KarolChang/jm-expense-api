import { getCustomRepository, EntityRepository, Repository } from 'typeorm'
import { createParamDecorator } from 'type-graphql'
import { InjectData } from '@/decorators/InjectData'
import { CustomContext } from '@graphql/auth/customContext'
import { Event } from '@entity/event'
import { ApolloError } from 'apollo-server-errors'

@InjectData()
@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  ctx: CustomContext
  log: boolean = true

  queryBuilder() {
    return this.createQueryBuilder('Event').orderBy('Event.createdAt')
  }

  getByUser() {
    const query = this.queryBuilder().leftJoin('Event.user', 'user')
    query.andWhere('user.id = :userId', { userId: this.ctx.user!.id })
    return query.getMany()
  }

  async getByUserAndId(id: number) {
    const query = this.queryBuilder().leftJoinAndSelect('Event.user', 'user')
    const event = await query.andWhere('Event.id = :id', { id }).getOne()
    // 是否為該使用者的事件
    if (event?.user.id !== this.ctx.user!.id) {
      throw new ApolloError('Data Access Error', 'no_access_get_event')
    }
    return event
  }
}

export const getEventRepo = () => getCustomRepository(EventRepository)

export const Repo = () => {
  return createParamDecorator(({ context }) => {
    const repo = getEventRepo()
    repo.ctx = context as CustomContext
    return repo
  })
}
