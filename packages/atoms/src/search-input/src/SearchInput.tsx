import React, { forwardRef, useEffect, useRef } from 'react'
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { useSearchFieldState } from '@react-stately/searchfield'
import { useSearchField } from '@react-aria/searchfield'
import { useCombinedRefs, useProviderProps } from '@jenga-ui/core'
import { BaseInputProps, BaseInput } from '@jenga-ui/base-input'
import { ariaToButtonProps, Button } from '@jenga-ui/button'

export interface JengaSearchInputProps extends BaseInputProps {
  /** Whether the search input is clearable using ESC keyboard button or clear button inside the input */
  isClearable?: boolean
}

export const SearchInput = forwardRef((props: JengaSearchInputProps, ref) => {
  props = useProviderProps(props)

  const { isClearable, value } = props

  const localRef = useRef(null)
  const combinedRef = useCombinedRefs(ref, localRef)
  const inputRef = useRef(null)

  useEffect(() => {
    const el = combinedRef && combinedRef.current

    if (el && value != null && el.value !== value) {
      el.value = value
    }
  }, [combinedRef, value])

  const state = useSearchFieldState(props)
  const { inputProps, clearButtonProps } = useSearchField(
    props,
    state,
    inputRef
  )

  return (
    <BaseInput
      inputProps={inputProps}
      ref={ref}
      inputRef={inputRef}
      inputStyles={{ paddingRight: '4x' }}
      type="search"
      prefix={<SearchOutlined />}
      suffixPosition="after"
      suffix={
        isClearable &&
        state.value !== '' &&
        !props.isReadOnly && (
          <Button
            type="clear"
            {...ariaToButtonProps(clearButtonProps)}
            color={{
              '': '#dark.50',
              'hovered | pressed': '#purple-text',
            }}
            radius="right (1r - 1bw)"
            padding=".5x 1x"
            placeSelf="stretch"
            icon={<CloseOutlined />}
          />
        )
      }
      {...props}
    />
  )
})

SearchInput.displayName = 'SearchInput'
