import { Entity, Column, ManyToOne, RelationId, ManyToMany, JoinTable } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { Basic } from '@entity/Basic'
import { Notification, NotificationInput } from '@entity/notification'
import { RecordLogActionEnum } from '@/graphql/enum'
import { Record, RecordInput } from '@entity/record'
import { User } from '@entity/user'

@ObjectType({ description: '紀錄Log資訊' })
export class RecordLogInfo {
  @Field({ description: '行為之前的紀錄' })
  record_before: Record

  @Field({ description: '行為之後的紀錄' })
  record_after: Record

  @Field({ description: '結算金額' })
  closedAmount: number
}

@Entity()
@ObjectType({ description: '紀錄Log', implements: Basic })
export class RecordLog extends Basic {
  constructor(action: RecordLogActionEnum, info: RecordLogInfo, user: User, records: Record[]) {
    super()
    this.action = action
    this.info = info
    this.user = user
    this.records = records
  }

  @Column({ type: 'enum', enum: RecordLogActionEnum })
  @Field({ description: '紀錄行為' })
  action: RecordLogActionEnum

  @Column({ type: 'json' })
  @Field({ description: '資訊' })
  info: RecordLogInfo

  @ManyToOne((type) => User, (user) => user.recordLogs)
  @Field((type) => User, { description: '事件觸發者' })
  user: User

  @RelationId((e: RecordLog) => e.user)
  userId: number

  @ManyToMany((type) => Record, (record) => record.recordLogs)
  @Field((type) => [Record], { description: '紀錄們' })
  records: Record[]
}
