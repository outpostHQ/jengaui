import React, { forwardRef, useCallback, useLayoutEffect, useRef } from 'react'
import { BaseInputProps, BaseInput } from '@jenga-ui/base-input'
import { useControlledState } from '@react-stately/utils'
import { useProviderProps } from '@jenga-ui/core'
import { useTextField } from '@react-aria/textfield'
import { chain } from '@react-aria/utils'

export interface JengaTextAreaProps extends BaseInputProps {
  /** Whether the textarea should change its size depends on content */
  autoSize?: boolean
  /** The rows attribute in HTML is used to specify the number of visible text lines for the
   * control i.e the number of rows to display. */
  rows?: number
}

function TextArea(props: JengaTextAreaProps, ref) {
  props = useProviderProps(props)
  const {
    autoSize = false,
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    onChange,
    ...otherProps
  } = props

  let { rows } = props

  rows = rows || 3

  const [inputValue, setInputValue] = useControlledState(
    props.value,
    props.defaultValue,
    () => {}
  )
  const inputRef: any = useRef<HTMLInputElement>(null)

  const onHeightChange = useCallback(() => {
    if (autoSize && inputRef.current) {
      const input = inputRef.current
      const prevAlignment = input.style.alignSelf
      const computedStyle = getComputedStyle(input)
      input.style.alignSelf = 'start'
      input.style.height = 'auto'
      input.style.height = input.scrollHeight
        ? `calc(${input.scrollHeight}px + (2 * var(--border-width)))`
        : `${
            parseFloat(computedStyle.paddingTop) +
            parseFloat(computedStyle.paddingBottom) +
            parseFloat(computedStyle.lineHeight) * (rows || 3) +
            2
          }px`
      input.style.alignSelf = prevAlignment
    }
  }, [inputRef])

  useLayoutEffect(() => {
    if (inputRef.current) {
      onHeightChange()
    }
  }, [onHeightChange, inputValue, inputRef])

  const { labelProps, inputProps } = useTextField(
    {
      ...props,
      onChange: chain(onChange, setInputValue),
      inputElementType: 'textarea',
    },
    inputRef
  )

  return (
    <BaseInput
      {...otherProps}
      ref={ref}
      inputRef={inputRef}
      labelProps={labelProps}
      inputProps={inputProps}
      multiLine
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      rows={rows}
    />
  )
}

/**
 * TextInputs are text inputs that allow users to input custom text entries
 * with a keyboard. Various decorations can be displayed around the field to
 * communicate the entry requirements.
 */
const _TextArea = Object.assign(forwardRef(TextArea), {
  jengaInputType: 'Text',
})
export { _TextArea as TextArea }
