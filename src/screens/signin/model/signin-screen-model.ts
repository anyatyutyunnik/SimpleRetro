import { createEvent } from 'effector'

import { routes } from '@app/shared/router'
import { createForm } from '@effector-reform/core'

const route = routes.signin

const anonymousForm = createForm({ schema: { displayName: '' } })

const signinByGooglePressed = createEvent()

export { route, anonymousForm, signinByGooglePressed }
