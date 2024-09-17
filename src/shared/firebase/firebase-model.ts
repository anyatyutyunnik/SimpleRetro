import { createEffect, createEvent, createStore, sample } from 'effector'
import { type FirebaseApp, initializeApp } from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'
import { type Firestore, getFirestore } from 'firebase/firestore'
import { spread } from 'patronum'

import { appStarted } from '@app/shared/config'

const firebaseAttached = createEvent()

const $firebase = createStore<FirebaseApp | null>(null)
const $firestore = createStore<Firestore | null>(null)
const $fireauth = createStore<Auth | null>(null)

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
  const fireauth = getAuth(firebase)

  return {
    firebase,
    firestore,
    fireauth,
  }
})

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

sample({
  clock: createFireBaseFx.done,
  fn: () => {},
  target: firebaseAttached,
})

export { $firebase, $firestore, $fireauth, firebaseAttached }
