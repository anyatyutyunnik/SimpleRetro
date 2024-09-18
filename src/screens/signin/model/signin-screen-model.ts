import { attach, createEvent, sample } from 'effector'
import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import invariant from 'ts-invariant'
import { object, string } from 'yup'

import { $fireauth } from '@app/shared/firebase'
import { redirect, router, routes } from '@app/shared/router'
import { urls } from '@app/shared/urls'
import { createForm } from '@effector-reform/core'
import { yupAdapter } from '@effector-reform/yup'

const route = routes.signin

const anonymousForm = createForm({
  schema: { displayName: '' },
  // @ts-expect-error (todo)
  validation: yupAdapter(
    object({
      displayName: string().required('Name is required'),
    }),
  ),
})

const signinByGooglePressed = createEvent()

const signinAnonymousFx = attach({
  source: [$fireauth, anonymousForm.$values],
  effect: async ([fireauth, values]) => {
    invariant(fireauth)
    const result = await signInAnonymously(fireauth)
    await updateProfile(result.user, { displayName: values.displayName })
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

sample({
  clock: [signinAnonymousFx.done, signinGoogleFx.done],
  source: router.$query,
  fn: (query) => query.retpath ?? urls.getMainUrl().pathname,
  target: redirect,
})

export { route, anonymousForm, signinByGooglePressed }
