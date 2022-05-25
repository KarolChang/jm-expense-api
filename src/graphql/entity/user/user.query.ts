import { Resolver, Query, Arg, Authorized } from 'type-graphql'
import { User, UserRepository, Repo } from '@entity/user'

@Resolver((of) => User)
export class UserQuery {
  @Authorized()
  @Query((returns) => User, { description: '取得現在使用者' })
  async me(@Repo() repo: UserRepository): Promise<User | undefined> {
    return repo.findOneOrFail(repo.ctx.user!.id)
  }

  @Authorized('admin')
  @Query((returns) => [User], { description: '依條件取得' })
  async users(@Repo() repo: UserRepository): Promise<User[]> {
    const query = repo.queryBuilder()
    return query.getMany()
  }

  @Authorized('admin')
  @Query((returns) => User, { description: '依ID取得' })
  async user(@Repo() repo: UserRepository, @Arg('id') id: number): Promise<User | undefined> {
    return repo.findOneOrFail(id)
  }

  @Authorized('admin')
  @Query((returns) => User, { description: '依Email取得' })
  async userByEmail(@Repo() repo: UserRepository, @Arg('email') email: string): Promise<User | undefined> {
    return repo.findOneOrFail({ where: { email } })
  }
}
