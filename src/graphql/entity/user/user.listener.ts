import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm'
import { User } from '@entity/user'
import { ApolloError } from 'apollo-server-errors'
import { adminApp } from '@/firebase/index'

@EventSubscriber()
export class UserEventSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User
  }

  async beforeInsert(event: InsertEvent<User>) {
    const user = event.entity
    // 在 firebase 創建用戶
    const firebaseUser = await adminApp.auth().createUser({
      email: user.email,
      password: user.password,
      displayName: user.displayName,
      photoURL: user.photoURL
      // emailVerified: false,
      // disabled: false,
    })
    console.log('firebaseUser!!!', firebaseUser)
    user.firebaseUid = firebaseUser.uid
    user.active = true
  }

  // beforeUpdate(event: UpdateEvent<User>) {}
  // beforeSoftRemove(event: RemoveEvent<User>) {}
  // beforeRemove(event: RemoveEvent<User>) {}
  // afterInsert(event: InsertEvent<User>) {}
  // afterUpdate(event: UpdateEvent<User>) {}
  // afterSoftRemove(event: RemoveEvent<User>) {}
  // afterRemove(event: RemoveEvent<User>) {}
}
