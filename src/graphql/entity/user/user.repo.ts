import { getCustomRepository, EntityRepository, Repository } from 'typeorm'
import { createParamDecorator } from 'type-graphql'
import { InjectData } from '@/decorators/InjectData'
import { CustomContext } from '@graphql/auth/customContext'
import { User } from '@entity/user'
import { ApolloError } from 'apollo-server-errors'

@InjectData()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  ctx: CustomContext
  log: boolean = true

  queryBuilder() {
    return this.createQueryBuilder('User').orderBy('User.createdAt')
  }

  async bindLineUserId(email: string, lineUserId: string) {
    const user = await this.findOne({ where: { email, active: true } })
    console.log('[bindLineUserId]user!!!', user)
    if (!user) {
      throw new ApolloError('Bind LineUserId Error', 'user_not_found[email]')
    }
    await this.save({ ...user, lineUserId })
    // return await this.update({ email }, { lineUserId })
  }

  async unlinkLineUserId(lineUserId: string) {
    const user = this.findOne({ where: { lineUserId, active: true } })
    if (!user) {
      throw new ApolloError('Unlink LineUserId Error', 'user_not_found[lineUserId]')
    }
    await this.save({ ...user, lineUserId: '' })
  }
}

export const getUserRepo = () => getCustomRepository(UserRepository)

export const Repo = () => {
  return createParamDecorator(({ context }) => {
    const repo = getUserRepo()
    repo.ctx = context as CustomContext
    return repo
  })
}
