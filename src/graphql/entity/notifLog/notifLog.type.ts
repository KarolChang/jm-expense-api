import { Entity, Column, ManyToOne } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { Basic } from '@entity/Basic'
import { Notification, NotificationInput } from '@entity/notification'

@Entity()
@ObjectType({ description: '通知紀錄', implements: Basic })
export class NotifLog extends Basic {
  @Column()
  @Field({ description: 'cron時間字串' })
  cronTimeString: string

  @Column()
  @Field({ description: '訊息' })
  message: string

  @Column({ type: 'datetime' })
  @Field({ description: '實際通知時間' })
  actual_notif_time: Date

  @ManyToOne((type) => Notification, (notif) => notif.notifLogs, { onDelete: 'CASCADE' })
  @Field((type) => Notification, { description: '所屬事件' })
  notification: Notification
}

@InputType({ description: '通知紀錄Input' })
export class NotifLogInput implements Partial<NotifLog> {
  @Column()
  @Field({ description: 'cron時間字串' })
  cronTimeString: string

  @Column()
  @Field({ description: '訊息' })
  message: string

  @Column({ type: 'datetime' })
  @Field({ description: '實際通知時間' })
  actual_notif_time: Date

  @Field((type) => NotificationInput, { description: '通知' })
  notification: Notification
}
