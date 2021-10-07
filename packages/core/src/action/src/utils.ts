import { useEffect, useState } from 'react'
import {
  FocusProps,
  FocusResult,
  useFocus as reactAriaUseFocus,
  useFocusVisible,
} from '@react-aria/interactions'

export const useFocus = (
  { isDisabled }: FocusProps,
  onlyVisible = false
): { focusProps: FocusResult['focusProps']; isFocused: boolean } => {
  useEffect(() => {
    setIsFocused(false)
  }, [isDisabled])

  const [isFocused, setIsFocused] = useState(false)
  const { isFocusVisible } = useFocusVisible({})
  const { focusProps } = reactAriaUseFocus({
    onFocusChange: setIsFocused,
  })

  return {
    focusProps,
    isFocused: isFocused && (onlyVisible ? isFocusVisible : true),
  }
}
