import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { CustomContext } from '@graphql/auth/customContext'

@Entity()
@ObjectType({ description: 'Log' })
export class Log {
  constructor(context: CustomContext, entity: any, action: 'INSERT' | 'UPDATE' | 'SOFT_REMOVE' | 'REMOVE') {
    if (context && entity && action) {
      this.uuid = context.uuid
      // userEmail & userDisplayName => 在註冊時使用 entity 的資訊
      this.userEmail = context.user ? context.user.email : entity.email
      this.userDisplayName = context.user ? context.user.displayName : entity.displayName
      this.sqlAction = action
      this.entityId = entity.id
      this.entityName = entity.constructor.name
      this.entity = entity
      this.operationType = context.info!.operation.operation.toUpperCase()
      this.operationName = context.info!.operation.name!.value
      this.fieldName = context.info!.fieldName
      this.variables = context.info!.variableValues
    }
  }

  @PrimaryGeneratedColumn()
  @Field()
  id: number

  @Column()
  @Field()
  uuid: string

  @CreateDateColumn({ type: 'datetime' })
  @Field()
  createdAt: Date

  @Column()
  @Field()
  userEmail: string

  @Column()
  @Field()
  userDisplayName: string

  @Column()
  @Field()
  sqlAction: string

  @Column()
  @Field()
  entityId: number

  @Column()
  @Field()
  entityName: string

  @Column({ type: 'json' })
  entity: any

  @Field()
  entityJsonString: string

  @Column()
  @Field()
  operationType: string

  @Column()
  @Field()
  operationName: string

  @Column({ nullable: true })
  @Field()
  fieldName: string

  @Column({ type: 'json', nullable: true })
  variables: any

  @Field()
  variablesJsonString: string

  @Column({ nullable: true })
  @Field()
  errorMessage?: string
}
