import { Entity, Column, ManyToOne } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { Basic } from '@graphql/Basic'
import { NotifTypeEnum } from '@graphql/enum'
import { Event } from '@entity/event'

@Entity()
@ObjectType({ description: '通知', implements: Basic })
export class Notification extends Basic {
  @Column({ type: 'datetime' })
  @Field({ description: '通知時間' })
  time: Date

  @Column()
  @Field({ description: '訊息' })
  message: string

  @Column({ type: 'enum', enum: NotifTypeEnum })
  @Field({ description: '通知類型' })
  type: NotifTypeEnum

  @ManyToOne((type) => Event, (event) => event.notifications)
  @Field((type) => Event, { description: '事件' })
  event: Event
}

@InputType({ description: '事件Input' })
export class NotificationInput implements Partial<Notification> {
  @Field({ description: 'id' })
  id: number

  @Field({ description: '通知時間' })
  time: Date

  @Field({ description: '訊息' })
  message: string

  @Field({ description: '通知類型' })
  type: NotifTypeEnum
}
