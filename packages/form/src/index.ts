import { Field } from './Field'
import { useForm } from './useForm'
import { useFormProps, Form as _Form } from './Form'

const Form = Object.assign(
  _Form as typeof _Form & {
    Item: typeof Field
    useForm: typeof useForm
  },
  { Item: Field, useForm }
)

export { useFormProps, Form, Field, useForm }
export type { JengaFormProps } from './Form'
export type { JengaFormInstance } from './useForm'

export * from './shared'
export * from './Label'
export * from './Field'
export * from './FieldWrapper'
export * from './HiddenInput'
export * from './validation'
export * from './Form'
