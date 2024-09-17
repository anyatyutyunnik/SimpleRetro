import { attach, createEvent, createStore, sample, scopeBind } from 'effector'
import { onAuthStateChanged } from 'firebase/auth'
import invariant from 'ts-invariant'

import { scope } from '@app/shared/config'
import { $fireauth, firebaseAttached } from '@app/shared/firebase'

export interface User {
  uid: string
  displayName: string
}

const userUpdated = createEvent<User | null>()

const $user = createStore<User | null>(null)

const attatchAuthStateFx = attach({
  source: $fireauth,
  effect: (fireauth) => {
    invariant(fireauth)

    onAuthStateChanged(fireauth, (payload) => {
      if (payload) {
        scopeBind(userUpdated, { scope })({
          uid: payload.uid,
          displayName: payload.displayName ?? 'Unknown',
        })
      } else {
        scopeBind(userUpdated, { scope })(null)
      }
    })
  },
})

sample({
  clock: firebaseAttached,
  target: attatchAuthStateFx,
})

sample({
  clock: userUpdated,
  target: $user,
})

export { userUpdated, $user }
