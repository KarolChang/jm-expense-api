import { Entity, Column, OneToMany } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { Basic } from '@entity/Basic'
import { Event } from '@entity/event'
import { UserRoleEnum } from '@graphql/enum'

@Entity()
@ObjectType({ description: '使用者', implements: Basic })
export class User extends Basic {
  @Column({ unique: true })
  @Field({ description: 'Email' })
  email: string

  @Column()
  @Field({ description: '顯示名稱' })
  displayName: string

  @Column({ nullable: true })
  @Field({ description: '顯示頭像' })
  photoURL: string

  @Column()
  @Field({ description: 'firebaseUid' })
  firebaseUid: string

  @Column({ nullable: true })
  @Field({ description: 'lineUserId' })
  lineUserId: string

  @Column()
  @Field({ description: '是否啟用' })
  active: boolean

  @Column({ type: 'enum', enum: UserRoleEnum })
  @Field({ description: '角色' })
  role: UserRoleEnum

  password: string

  @OneToMany((type) => Event, (event) => event.user)
  @Field((type) => [Event], { description: '事件' })
  events: Event[]
}

@InputType({ description: '使用者Input' })
export class UserInput implements Partial<User> {
  @Field({ description: 'id' })
  id: number

  @Field({ description: 'Email' })
  email: string

  @Field({ description: '顯示名稱' })
  displayName: string

  @Field({ description: '顯示頭像' })
  photoURL: string

  @Field({ description: 'firebaseUid' })
  firebaseUid: string

  @Field({ description: 'lineUserId' })
  lineUserId: string

  @Field({ description: '是否啟用' })
  active: boolean

  @Field({ description: '角色' })
  role: UserRoleEnum

  @Field({ description: '密碼' })
  password: string
}
