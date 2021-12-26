import React, { forwardRef, useCallback, useRef, useState } from 'react'
import { BaseInputProps, BaseInput } from '@jenga-ui/base-input'
import { useProviderProps } from '@jenga-ui/core'
import { useTextField } from '@react-aria/textfield'
import { Button } from '@jenga-ui/button'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

function PasswordInput(props: BaseInputProps, ref) {
  const { suffix, ...otherProps } = useProviderProps({ ...props })

  const [type, setType] = useState('password')
  const inputRef = useRef(null)
  const { labelProps, inputProps } = useTextField(
    {
      ...otherProps,
      type,
    },
    inputRef
  )

  const toggleType = useCallback((e) => {
    setType((type) => (type === 'password' ? 'text' : 'password'))
  }, [])

  const wrappedSuffix = (
    <>
      {suffix}
      <Button
        type="neutral"
        htmlType="button"
        onPress={toggleType}
        placeSelf="stretch"
        height="auto"
        radius="right (1r - 1bw)"
        padding=".5x 1x"
        width="auto"
        aria-label="Toggle masking"
        excludeFromTabOrder
        icon={type === 'password' ? <EyeInvisibleOutlined /> : <EyeOutlined />}
      />
    </>
  )

  return (
    <BaseInput
      labelProps={labelProps}
      inputProps={inputProps}
      ref={ref}
      inputRef={inputRef}
      inputStyles={{ paddingRight: '4x' }}
      type={type}
      suffixPosition="after"
      suffix={wrappedSuffix}
      {...otherProps}
    />
  )
}

/**
 * PasswordInputs are password inputs that allow users to input passwords or code entries
 * with a keyboard. Various decorations can be displayed around the field to
 * communicate the entry requirements.
 */
const _PasswordInput = Object.assign(forwardRef(PasswordInput), {
  cubeInputType: 'Text',
})
export { _PasswordInput as PasswordInput }
