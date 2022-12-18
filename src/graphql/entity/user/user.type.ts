import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { Basic } from '@entity/Basic'
import { Event } from '@entity/event'
import { UserRoleEnum } from '@graphql/enum'
import { Notification } from '@entity/notification'
import { RecordLog } from '@entity/recordLog'

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

  @OneToMany((type) => Event, (event) => event.user)
  @Field((type) => [Event], { description: '事件' })
  events: Event[]

  @OneToMany((type) => Notification, (notif) => notif.creator)
  @Field((type) => [Notification], { description: '所有通知' })
  notifications: Notification[]

  @OneToMany((type) => RecordLog, (recordLog) => recordLog.user)
  @Field((type) => [RecordLog], { description: '紀錄Logs' })
  recordLogs: RecordLog[]

  // @ManyToMany((type) => Notification, (notif) => notif.users)
  // @JoinTable({ name: 'users_notifs' })
  // @Field((type) => [Notification], { description: '通知' })
  // notifications: Notification[]
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
