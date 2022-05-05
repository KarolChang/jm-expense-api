import { getRepository } from 'typeorm'
import { Resolver, Mutation, Arg } from 'type-graphql'
import { User, UserInput } from '@entity/user/user.type'
import { ApolloError } from 'apollo-server-errors'

@Resolver()
export class UserMutation {
  repo = getRepository(User)

  @Mutation((returns) => User, { description: '儲存使用者' })
  async saveUser(@Arg('user') input: UserInput) {
    let user = this.repo.create(input)
    return await this.repo.save(user)
  }

  @Mutation((returns) => User, { description: '刪除使用者' })
  async removeUser(@Arg('id') id: number) {
    const user = await this.repo.findOne(id)
    if (!user) {
      throw new ApolloError('Entity ID Not Found', 'entity_id_not_found')
    } else {
      return this.repo.softRemove(user)
    }
  }
}
