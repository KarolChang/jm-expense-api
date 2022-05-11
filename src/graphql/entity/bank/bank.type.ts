import { Entity, Column, OneToMany } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { Basic } from '@graphql/Basic'
import { Event } from '@entity/event'

@Entity()
@ObjectType({ description: '銀行機構', implements: Basic })
export class Bank extends Basic {
  @Column()
  @Field({ description: '名稱' })
  name: string

  @Column()
  @Field({ description: '代碼' })
  code: string

  @OneToMany((type) => Event, (event) => event.bank)
  @Field((type) => [Event], { description: '事件' })
  events: Event[]
}

@InputType({ description: '銀行機構Input' })
export class BankInput implements Partial<Bank> {
  @Field({ description: 'id' })
  id: number
}
