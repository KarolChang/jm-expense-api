import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { Basic } from '@graphql/Basic'
import { User, UserInput } from '@entity/user'
import { Notification, NotificationInput } from '@entity/notification'
import { Bank, BankInput } from '@entity/bank'

@Entity()
@ObjectType({ description: '事件', implements: Basic })
export class Event extends Basic {
  // @Column()
  // @Field({ description: '銀行' })
  // bank: string

  // @ManyToOne((type) => Bank, (bank) => bank.events)
  @ManyToOne((type) => Bank)
  @Field((type) => Bank, { description: '銀行機構' })
  bank: Bank

  @Column()
  @Field({ description: '商品' })
  item: string

  @ManyToOne((type) => User, (user) => user.events)
  @Field((type) => User, { description: '使用者' })
  user: User

  @OneToMany((type) => Notification, (notif) => notif.event, { cascade: true })
  @Field((type) => [Notification], { description: '通知' })
  notifications: Notification[]
}

@InputType({ description: '事件Input' })
export class EventInput implements Partial<Event> {
  @Field({ description: 'id' })
  id: number

  @Field((type) => BankInput, { description: '銀行機構' })
  bank: Bank

  @Field({ description: '商品' })
  item: string

  @Field((type) => UserInput, { description: '使用者' })
  user: User

  @Field((type) => [NotificationInput], { description: '通知' })
  notifications: Notification[]
}
