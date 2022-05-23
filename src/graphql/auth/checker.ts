import { AuthChecker } from 'type-graphql'
import { CustomContext } from '@graphql/auth/customContext'
import { ApolloError } from 'apollo-server-errors'
import { adminApp } from '@/firebase/index'
import { getRepository } from 'typeorm'
import { User } from '@entity/user'

export const customAuthChecker: AuthChecker<CustomContext> = async ({ root, args, context, info }, role) => {
  try {
    // 存 info 在 context 中
    context.info = info

    // 驗證使用者
    // 1. 取得 token
    let firebaseIdToken
    const authorization = context.headers['authorization']
    if (authorization && authorization.startsWith('Bearer ')) {
      firebaseIdToken = authorization.substring(7, authorization.length)
    } else {
      throw new ApolloError('Authorization Error', 'authorization_error')
    }
    // 2. 比對 token, 找出使用者
    let user
    const decodedData = await adminApp.auth().verifyIdToken(firebaseIdToken)
    const firebaseUid = decodedData.uid
    const firebaseUser = await adminApp.auth().getUser(firebaseUid)

    if (firebaseUser.disabled) {
      throw new ApolloError('Firebase User Status Is DISABLE', 'firebase_user_disable')
    }

    user = await getRepository(User).findOneOrFail({ firebaseUid })
    if (user.active) {
      context.user = user
    } else {
      throw new ApolloError('User Is Inactive', 'user_inactive')
    }

    // 3. 是否有權限
    if (role.includes('admin') && user.role !== 'admin') {
      throw new ApolloError('User Do Not Have Permission', 'user_permission_denied')
    } else {
      return true
    }
  } catch (error) {
    throw error
  }
}
