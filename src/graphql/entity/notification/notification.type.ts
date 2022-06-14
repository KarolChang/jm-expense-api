import { Entity, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { Basic } from '@entity/Basic'
import { NotifTypeEnum, NotifRepeatTypeEnum } from '@graphql/enum'
import { Event } from '@entity/event'
import { NotifLog } from '@entity/notifLog'
import { User, UserInput } from '@entity/user'

@Entity()
@ObjectType({ description: '通知', implements: Basic })
export class Notification extends Basic {
  @Column({ unique: true })
  @Field({ description: 'uid' })
  uid: string

  @Column({ type: 'enum', enum: NotifTypeEnum })
  @Field({ description: '通知類型' })
  type: NotifTypeEnum

  @Column({ type: 'datetime' })
  @Field({ description: '發生時間' })
  happened_time: Date

  @Column({ type: 'datetime' })
  @Field({ description: '通知時間' })
  notif_time: Date

  @Column()
  @Field({ description: '訊息' })
  message: string

  @Column({ type: 'enum', enum: NotifRepeatTypeEnum })
  @Field({ description: '重複類型' })
  repeatType: NotifRepeatTypeEnum

  @Column({ length: 2 })
  @Field({ description: 'tag文字' })
  tagText: string

  @Column()
  @Field({ description: 'tag顏色' })
  tagColor: string

  @Column()
  @Field({ description: '文字顏色' })
  textColor: string

  @Column()
  @Field({ description: 'cron時間字串' })
  cronTimeString: string

  @ManyToOne((type) => Event, (event) => event.notifications, { orphanedRowAction: 'delete' })
  @Field((type) => Event, { description: '事件' })
  event: Event

  @OneToMany((type) => NotifLog, (log) => log.notification)
  @Field((type) => [NotifLog], { description: '通知紀錄' })
  notifLogs: NotifLog[]

  @ManyToMany((type) => User, (user) => user.notifications)
  @Field((type) => [User], { description: '被通知的人' })
  users: User[]
}

@InputType({ description: '通知Input' })
export class NotificationInput implements Partial<Notification> {
  @Field({ description: 'id' })
  id: number

  @Field({ description: 'uid' })
  uid: string

  @Field({ description: '通知類型' })
  type: NotifTypeEnum

  @Field({ description: '發生時間' })
  happened_time: Date

  @Field({ description: '通知時間' })
  notif_time: Date

  @Field({ description: '訊息' })
  message: string

  @Field({ description: '重複類型' })
  repeatType: NotifRepeatTypeEnum

  @Field({ description: 'tag文字' })
  tagText: string

  @Field({ description: 'tag顏色' })
  tagColor: string

  @Field({ description: '文字顏色' })
  textColor: string

  @Field((type) => [UserInput], { description: '被通知的人' })
  users: User[]
}
