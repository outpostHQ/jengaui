import { BaseProps, TextStyleProps } from 'tastycss-react'

export interface ButtonProps extends BaseProps, Partial<TextStyleProps> {
  to?: string
  label?: string
  typeAttribute?: 'button' | 'reset' | 'submit' | undefined
}
