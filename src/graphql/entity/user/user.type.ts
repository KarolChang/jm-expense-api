import { Entity, Column, OneToMany } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { Basic } from '@/graphql/Basic'
import { Event, EventInput } from '@entity/event'

@Entity()
@ObjectType({ description: '使用者', implements: Basic })
export class User extends Basic {
  @Column()
  @Field({ description: 'Email' })
  email: string

  @Column()
  @Field({ description: 'Line使用者ID' })
  lineUserId: string

  @OneToMany((type) => Event, (event) => event.user)
  @Field((type) => [Event], { description: '事件' })
  events: Event[]
}

@InputType({ description: '使用者Input' })
export class UserInput implements Partial<User> {
  @Field({ description: 'id' })
  id: number
}
