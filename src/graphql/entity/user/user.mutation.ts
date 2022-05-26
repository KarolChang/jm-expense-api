import { Resolver, Mutation, Arg, Authorized } from 'type-graphql'
import { User, UserInput, UserRepository, Repo } from '@entity/user'

@Resolver((of) => User)
export class UserMutation {
  // @Authorized()
  @Mutation((returns) => User, { description: '儲存' })
  async saveUser(@Repo() repo: UserRepository, @Arg('user') input: UserInput) {
    let user = repo.create(input)
    return await repo.save(user)
  }

  @Authorized()
  @Mutation((returns) => User, { description: '刪除' })
  async removeUser(@Repo() repo: UserRepository, @Arg('id') id: number) {
    const user = await repo.findOneOrFail(id)
    return repo.softRemove(user)
  }
}
