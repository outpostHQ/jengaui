import {
  BaseProps,
  ContainerStyleProps,
  TagNameProps,
  TextStyleProps,
} from 'tastycss-react'
import { AriaButtonProps } from '@react-types/button'
import { MouseEventHandler } from 'react'

export interface ActionProps
  extends BaseProps,
    TagNameProps,
    Partial<ContainerStyleProps>,
    Partial<TextStyleProps>,
    Omit<AriaButtonProps, 'type'> {
  to?: string
  label?: string
  htmlType?: 'button' | 'submit' | 'reset' | undefined
  skipWarnings?: boolean
  preventDefault?: boolean
  onClick?: MouseEventHandler
  typeAttribute?: 'button' | 'reset' | 'submit' | undefined
}
