import { useProviderProps } from '@jenga-ui/core'
import React, { forwardRef, useRef } from 'react'
import { BaseInput, BaseInputProps } from '../../base-input'
import { useTextField } from '@react-aria/textfield'

function Input(props: BaseInputProps, ref) {
  props = useProviderProps(props)

  const inputRef = useRef(null)
  const { labelProps, inputProps } = useTextField(props, inputRef)

  return (
    <BaseInput
      {...props}
      labelProps={labelProps}
      inputProps={inputProps}
      ref={ref}
      inputRef={inputRef}
    />
  )
}

/**
 * Input are text inputs that allow users to input custom text entries
 * with a keyboard. Various decorations can be displayed around the field to
 * communicate the entry requirements.
 */
const _Input = forwardRef(Input)
export { _Input as Input }
