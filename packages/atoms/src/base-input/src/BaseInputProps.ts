import {
  BaseProps,
  PositionStyleProps,
  Props,
  BlockStyleProps,
  Styles,
} from 'tastycss-react'
import { AriaTextFieldProps } from '@react-types/textfield'
import { ReactNode, RefObject } from 'react'
import { FormFieldProps } from '@jenga-ui/core'

export interface BaseInputProps
  extends BaseProps,
    Partial<PositionStyleProps>,
    Partial<BlockStyleProps>,
    AriaTextFieldProps,
    FormFieldProps {
  /** Input decoration before the main input */
  prefix?: ReactNode
  /** Input decoration after the main input */
  suffix?: ReactNode
  /** Suffix position goes before or after the validation and loading statuses */
  suffixPosition?: 'before' | 'after'
  /** Whether the input is multiline */
  multiLine?: boolean
  /** Whether the input should have auto focus */
  autoFocus?: boolean
  /** Direct input props */
  inputProps?: Props
  /** Direct input wrapper props */
  wrapperProps?: Props
  /** The input ref */
  inputRef?: RefObject<HTMLInputElement>
  /** The wrapper ref */
  wrapperRef?: RefObject<HTMLDivElement>
  /** Whether the input has the loading status */
  isLoading?: boolean
  /** The loading status indicator */
  loadingIndicator?: ReactNode
  /** Style map for the input */
  inputStyles?: Styles
  /** Style map for the input wrapper */
  wrapperStyles?: Styles
  /** The number of rows for the input. Only applies to textarea. */
  rows?: number
  /** The resize CSS property sets whether an element is resizable, and if so, in which directions. */
  resize?: Styles['resize']
  size?: 'small' | 'default' | 'large' | string
}
