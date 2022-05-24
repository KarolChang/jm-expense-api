import { CustomContext } from '@graphql/auth/customContext'
import { EntityManager } from 'typeorm'

export class LineMessage<T> {
  ctx: CustomContext
  entity: T
  action: 'INSERT' | 'UPDATE' | 'SOFT_REMOVE' | 'REMOVE'
  manager: EntityManager

  push() {}
}
