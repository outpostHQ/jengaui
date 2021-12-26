import { ButtonProps } from './ButtonProps'
import { AriaButtonProps } from '@react-types/button'

/** Converts AriaButtonProps to ButtonProps */
export function ariaToButtonProps(
  props: AriaButtonProps<'button'>
): ButtonProps {
  const { type, ...filteredProps } = props

  return {
    ...filteredProps,
    htmlType: type,
  }
}

/** Converts ButtonProps to AriaButtonProps */
export function jengaToAriaButtonProps(
  props: ButtonProps
): AriaButtonProps<'button'> {
  const { htmlType, ...filteredProps } = props

  return {
    ...filteredProps,
    type: htmlType,
  }
}
