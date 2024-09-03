import { createEffect, createStore, sample } from 'effector'
import { type FirebaseApp, initializeApp } from 'firebase/app'
import { type Auth, initializeAuth } from 'firebase/auth'
import { type Firestore, getFirestore } from 'firebase/firestore'
import { spread } from 'patronum'

import { appStarted } from '@app/shared/config'

const createFireBaseFx = createEffect(() => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }

  const firebase = initializeApp(firebaseConfig)
  const firestore = getFirestore(firebase)
  const fireauth = initializeAuth(firebase)

  return {
    firebase,
    firestore,
    fireauth,
  }
})

const $firebase = createStore<FirebaseApp | null>(null)
const $firestore = createStore<Firestore | null>(null)
const $fireauth = createStore<Auth | null>(null)

sample({
  clock: appStarted,
  target: createFireBaseFx,
})

sample({
  clock: createFireBaseFx.doneData,
  target: spread({
    firebase: $firebase,
    firestore: $firestore,
    fireauth: $fireauth,
  }),
})

export { $firebase, $firestore, $fireauth }
