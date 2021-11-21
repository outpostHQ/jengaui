import { useEffect, useState } from 'react'
import {
  FocusProps,
  useFocus as reactAriaUseFocus,
  useFocusVisible,
} from '@react-aria/interactions'

export function useFocus({ isDisabled }: FocusProps, onlyVisible = false) {
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
