import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { Basic } from '@graphql/Basic'
import { User, UserInput } from '@entity/user'
import { Notification } from '@entity/notification'

@Entity()
@ObjectType({ description: '事件', implements: Basic })
export class Event extends Basic {
  @Column()
  @Field({ description: '銀行' })
  bank: string

  @Column()
  @Field({ description: '卡名' })
  card: string

  @Column({ type: 'date', nullable: true })
  @Field({ description: '結帳日' })
  account_day: Date

  @Column({ type: 'date', nullable: true })
  @Field({ description: '繳費日' })
  payment_day: Date

  @ManyToOne((type) => User, (user) => user.events)
  @Field((type) => User, { description: '使用者' })
  user: User

  @OneToMany((type) => Notification, (notif) => notif.event)
  @Field((type) => [Notification], { description: '通知' })
  notifications: Notification[]
}

@InputType({ description: '事件Input' })
export class EventInput implements Partial<Event> {
  @Field({ description: 'id' })
  id: number

  @Field({ description: '銀行' })
  bank: string

  @Field({ description: '卡名' })
  card: string

  @Field({ description: '結帳日' })
  account_day: Date

  @Field({ description: '繳費日' })
  payment_day: Date

  @Field((type) => UserInput, { description: '使用者' })
  user: User
}
