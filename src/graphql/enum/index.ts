import { registerEnumType } from 'type-graphql'

export enum NotifTypeEnum {
  account_day = 'account_day',
  payment_day = 'payment_day',
  other = 'other',
  basic = 'basic'
}

registerEnumType(NotifTypeEnum, {
  name: 'NotifTypeEnum',
  description: '通知類型 enum'
})

export enum NotifRepeatTypeEnum {
  never = 'never',
  every_day = 'every_day',
  every_week = 'every_week',
  every_month = 'every_month',
  every_year = 'every_year'
}

registerEnumType(NotifRepeatTypeEnum, {
  name: 'NotifRepeatTypeEnum',
  description: '重複類型 enum'
})

export enum UserRoleEnum {
  admin = 'admin',
  user = 'user'
}

registerEnumType(UserRoleEnum, {
  name: 'UserRoleEnum',
  description: '使用者角色 enum'
})

export enum LineActionEnum {
  replyMessage = 'replyMessage',
  pushMessage = 'pushMessage',
  multicast = 'multicast',
  broadcast = 'broadcast'
}

registerEnumType(LineActionEnum, {
  name: 'LineActionEnum',
  description: 'Line發送訊息方法 enum'
})

export enum RecordLogActionEnum {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  CLOSE = 'CLOSE'
}

registerEnumType(RecordLogActionEnum, {
  name: 'RecordLogActionEnum',
  description: '紀錄行為 enum'
})
