import { registerEnumType } from 'type-graphql'

export enum NotifTypeEnum {
  account_day = 'account_day',
  payment_day = 'payment_day',
  other = 'other'
}

registerEnumType(NotifTypeEnum, {
  name: 'NotifTypeEnum',
  description: '通知類型 enum'
})
