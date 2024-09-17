import { useUnit } from 'effector-react'
import { type FC } from 'react'

import { Button, Form, TextField } from '@app/shared/ui'
import { useForm } from '@effector-reform/react'

import { anonymousForm, signinByGooglePressed } from './model/signin-screen-model'

const SigninScreen: FC = () => {
  const form = useForm(anonymousForm)
  const { onSigninByGooglePress } = useUnit({ onSigninByGooglePress: signinByGooglePressed })

  return (
    <div>
      <Form onSubmit={form.onSubmit}>
        <TextField
          label="Enter your name"
          errorMessage={form.fields.displayName.error ?? ''}
          isInvalid={!form.fields.displayName.isValid}
          value={form.fields.displayName.value}
          onChange={form.fields.displayName.onChange}
        />
        <Button type="submit">Sign in as anonymous</Button>
      </Form>
      <div>
        <Button onPress={onSigninByGooglePress}>Sign in via Google</Button>
      </div>
    </div>
  )
}

export { SigninScreen }
