import { FormBaseProps } from '@jenga-ui/core'
import { FormHTMLAttributes } from 'react'
import { BaseProps, ContainerStyleProps } from 'tastycss-react'
import { FormStore, JengaFormData } from './useForm'

export interface FormProps
  extends FormBaseProps,
    BaseProps,
    ContainerStyleProps,
    Pick<
      FormHTMLAttributes<HTMLFormElement>,
      'action' | 'autoComplete' | 'encType' | 'method' | 'target'
    > {
  /** The form name */
  name?: string
  defaultValues?: { [key: string]: any }
  onValuesChange?: (data: JengaFormData) => void | Promise<any>
  onSubmit?: (data: JengaFormData) => void | Promise<any>
  onSubmitFailed?: (any?) => void | Promise<any>
  form?: FormStore
}
