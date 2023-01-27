import { getRepository } from 'typeorm'
import { Resolver, FieldResolver, Root } from 'type-graphql'
import { Record } from '@entity/record'
import { User } from '@entity/user'

@Resolver((of) => Record)
export class RecordFieldResolver {
  @FieldResolver((type) => User)
  async user(@Root() root: Record): Promise<User | undefined> {
    return await getRepository(User)
    .createQueryBuilder("User")
    .leftJoinAndSelect("User.records", "records")
    .where('records.id = :recordId', { recordId: root.id })
    .getOne()
  }
}
