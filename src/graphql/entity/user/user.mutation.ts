import { Resolver, Mutation, Arg, Authorized } from 'type-graphql'
import { User, UserInput, UserRepository, Repo } from '@entity/user'

@Resolver((of) => User)
export class UserMutation {
  @Authorized()
  @Mutation((returns) => User, { description: '儲存' })
  async saveUser(@Repo() repo: UserRepository, @Arg('user') input: UserInput) {
    console.log('[M]user', input)
    let user = repo.create(input)
    // 有 password 代表是註冊
    if (input.password) {
      console.log('[M]input.password', input.password)
      return await repo.save(user, { data: { password: input.password } })
    } else {
      return await repo.save(user)
    }
  }

  @Authorized()
  @Mutation((returns) => User, { description: '刪除' })
  async removeUser(@Repo() repo: UserRepository, @Arg('id') id: number) {
    const user = await repo.findOneOrFail(id)
    return repo.softRemove(user)
  }

  @Authorized()
  @Mutation((returns) => User, { description: 'line綁定' })
  async bindUser(@Repo() repo: UserRepository, @Arg('email') email: string, @Arg('lineUserId') lineUserId: string) {
    console.log('[M]bindUser', repo, email, lineUserId)
    await repo.bindLineUserId(email, lineUserId)
  }

  // @Authorized()
  // @Mutation((returns) => User, { description: 'line解除綁定' })
  // async removeUser(@Repo() repo: UserRepository, @Arg('id') id: number) {
  //   const user = await repo.findOneOrFail(id)
  //   return repo.softRemove(user)
  // }
}
