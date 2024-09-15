import { attach, createEvent, sample } from 'effector'
import { signInAnonymously, signInWithPopup, updateProfile } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth/web-extension'
import invariant from 'ts-invariant'

import { $fireauth } from '@app/shared/firebase'
import { routes } from '@app/shared/router'
import { createForm } from '@effector-reform/core'

const route = routes.signin

const anonymousForm = createForm({ schema: { displayName: '' } })

const signinByGooglePressed = createEvent()

const signinAnonymousFx = attach({
  source: [$fireauth, anonymousForm.$values],
  effect: async ([fireauth, values]) => {
    invariant(fireauth)
    const result = await signInAnonymously(fireauth)
    updateProfile(result.user, { displayName: values.displayName })
  },
})

const signinGoogleFx = attach({
  source: $fireauth,
  effect: async (fireauth) => {
    invariant(fireauth)
    const provider = new GoogleAuthProvider()
    await signInWithPopup(fireauth, provider)
  },
})

sample({
  clock: anonymousForm.validatedAndSubmitted,
  target: signinAnonymousFx,
})

sample({
  clock: signinByGooglePressed,
  target: signinGoogleFx,
})

export { route, anonymousForm, signinByGooglePressed }
