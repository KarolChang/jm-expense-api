import { Entity, Column, ManyToOne, RelationId, ManyToMany, JoinTable } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { Basic } from '@entity/Basic'
import { User, UserInput } from '@entity/user'
import { RecordLog } from '@entity/recordLog'

@Entity()
@ObjectType({ description: '紀錄', implements: Basic })
export class Record extends Basic {
  @Column({ type: 'date' })
  @Field({ description: '日期' })
  date: Date

  @Column()
  @Field({ description: '項目' })
  item: string

  @Column()
  @Field({ description: '商家' })
  merchant: string

  @Column()
  @Field({ description: '金額' })
  amount: number

  @Column()
  @Field({ description: '是否已結算' })
  isClosed: boolean = false

  @ManyToOne((type) => User)
  @Field((type) => User, { description: '紀錄創建者' })
  user: User

  @RelationId((e: Record) => e.user)
  userId: number

  @ManyToMany((type) => RecordLog)
  @JoinTable({ name: 'recordLogs_records' })
  @Field((type) => [RecordLog], { description: '所屬紀錄Logs' })
  recordLogs: RecordLog[]
}

@InputType({ description: '紀錄Input' })
export class RecordInput implements Partial<Record> {
  @Field({ description: 'id' })
  id: number

  @Field({ description: '日期' })
  date: Date

  @Column()
  @Field({ description: '項目' })
  item: string

  @Field({ description: '商家' })
  merchant: string

  @Field({ description: '金額' })
  amount: number

  @Field((type) => UserInput, { description: '紀錄創建者' })
  user: User
}

@ObjectType({ description: '每月資料' })
export class AmountByMonth {
  constructor(year_month: string) {
    this.year_month = year_month
  }

  @Field({ description: '年/月' })
  year_month: string

  @Field({ description: '總金額' })
  totalAmount: number

  @Field({ description: '已結算金額' })
  closedAmount: number
}
