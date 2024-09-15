import { attach, createEvent, createStore, sample } from 'effector'
import { onAuthStateChanged } from 'firebase/auth'
import invariant from 'ts-invariant'

import { $fireauth, firebaseAttached } from '@app/shared/firebase'

const userUpdated = createEvent<any>()

const $user = createStore(null)

const attatchAuthStateFx = attach({
  source: $fireauth,
  effect: (fireauth) => {
    invariant(fireauth)
    onAuthStateChanged(fireauth, (_payload) => {
        console.log(_payload)
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

export { $user }
