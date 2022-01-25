import { ReactNode } from 'react'
import { ActionProps } from '@jenga-ui/action'

export interface ButtonProps extends ActionProps {
  ghost?: boolean
  icon?: ReactNode
  isLoading?: boolean
  isSelected?: boolean
  type?:
    | 'primary'
    | 'default'
    | 'danger'
    | 'link'
    | 'clear'
    | 'outline'
    | 'neutral'
    | string
  size?: 'small' | 'default' | 'large' | string
}
