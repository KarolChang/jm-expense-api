import { IncomingHttpHeaders } from 'http'
import { User } from '@entity/user'
import { GraphQLResolveInfo } from 'graphql'

export interface CustomContext {
  uuid: string
  headers: IncomingHttpHeaders
  user?: User
  info?: GraphQLResolveInfo
}
