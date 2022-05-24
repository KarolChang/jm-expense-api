import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { LineActionEnum } from '@graphql/enum'
import { Message } from '@line/bot-sdk'

@Entity()
@ObjectType({ description: 'LineLog' })
export class LineLog {
  constructor(
    uuid: string,
    to: string | string[],
    message: Message | Message[],
    action: LineActionEnum,
    errorMsg?: string
  ) {
    this.uuid = uuid
    this.to = to
    this.message = message
    this.action = action
    this.errorMsg = errorMsg
  }

  @PrimaryGeneratedColumn()
  @Field()
  id: number

  @CreateDateColumn({ type: 'datetime' })
  @Field()
  createdAt: Date

  @Column()
  @Field({ description: 'uuid' })
  uuid: string

  @Column({ type: 'json' })
  to: string | string[]

  @Field({ description: '發送對象' })
  toJsonString: string

  @Column({ type: 'json' })
  message: Message | Message[]

  @Field({ description: '發送訊息' })
  messageJsonString: string

  @Column({ type: 'enum', enum: LineActionEnum })
  @Field({ description: 'Line發送訊息方法' })
  action: LineActionEnum

  @Column({ nullable: true })
  @Field({ description: '錯誤訊息' })
  errorMsg?: string
}

// @InputType({ description: 'LineLogInput' })
// export class LineLogInput implements Partial<LineLog> {
//   @Field({ description: 'id' })
//   id: number
// }
