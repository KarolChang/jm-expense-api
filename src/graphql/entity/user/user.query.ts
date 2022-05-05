import { getRepository } from 'typeorm'
import { Resolver, Query, Arg } from 'type-graphql'
import { User } from '@entity/user'

@Resolver()
export class UserQuery {
  repo = getRepository(User).createQueryBuilder('User')

  @Query((returns) => [User], { description: '取得所有使用者' })
  async users(): Promise<User[]> {
    return this.repo.getMany()
  }

  @Query((returns) => User, { description: '依Email取得使用者' })
  async userByEmail(@Arg('email') email: string): Promise<User | undefined> {
    return this.repo.where('User.email = :email', { email }).getOneOrFail()
  }

  @Query((returns) => User, { description: '依ID取得使用者' })
  async user(@Arg('id') id: number): Promise<User | undefined> {
    return this.repo.where('User.id = :id', { id }).getOneOrFail()
  }
}
