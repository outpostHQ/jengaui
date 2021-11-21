import { ActionProps } from '@jenga-ui/core'

export interface InputProps extends ActionProps {
  ghost?: boolean
  icon?: JSX.Element
  isLoading?: boolean
  isSelected?: boolean
  type?:
    | 'primary'
    | 'default'
    | 'danger'
    | 'link'
    | 'clear'
    | 'outline'
    | 'tab'
    | 'item'
}
