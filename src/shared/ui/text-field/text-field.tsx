import { FC } from 'react'
import {
  FieldError,
  Input,
  Label,
  Text,
  TextField as TextFieldBase,
  TextFieldProps as TextFieldBaseProps,
} from 'react-aria-components'

interface TextFieldProps extends TextFieldBaseProps {
  label: string
  errorMessage?: string
}

export const TextField: FC<TextFieldProps> = (props) => {
  const { label, errorMessage, ...otherProps } = props

  return (
    <TextFieldBase {...otherProps}>
      <Label>{label}</Label>
      <Input />
      <Text slot="description" />
      <FieldError>{errorMessage}</FieldError>
    </TextFieldBase>
  )
}
