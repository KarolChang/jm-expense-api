import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import { InterfaceType, Field } from 'type-graphql'

@InterfaceType({ description: '基礎物件' })
export class Basic {
  @PrimaryGeneratedColumn()
  @Field({ description: 'id' })
  id: number

  @CreateDateColumn({ type: 'datetime' })
  @Field({ description: 'Create Date Time' })
  createdAt: Date

  @UpdateDateColumn({ type: 'datetime' })
  @Field({ description: 'Update Date Time' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'datetime' })
  @Field({ description: 'Delete Date Time' })
  deleteAt: Date
}
