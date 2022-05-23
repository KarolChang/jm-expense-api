import admin from 'firebase-admin'
import * as serviceAccount from '@/firebase/jm-expense-2022-firebase-adminsdk-f6v3h-fce130054a.json'

export const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})
