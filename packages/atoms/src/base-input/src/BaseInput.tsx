import {
  WarningOutlined,
  CheckOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { createFocusableRef } from '@react-spectrum/utils'
import React, {
  cloneElement,
  forwardRef,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useFormProps } from '../../form/src/useFormProps'
import { useHover } from '@react-aria/interactions'
import { useProviderProps, useFocus, mergeProps } from '@jenga-ui/core'
import {
  Element,
  extractStyles,
  BLOCK_STYLES,
  POSITION_STYLES,
  DIMENSION_STYLES,
  useContextStyles,
  Styles,
  BaseProps,
  BlockStyleProps,
  PositionStyleProps,
  Props,
} from 'tastycss-react'
import { Prefix, Suffix, Space, Block } from '@jenga-ui/core'
import { FieldWrapper } from '../../form'
import { BaseInputProps } from './BaseInputProps'

const WRAPPER_STYLES: Styles = {
  display: 'grid',
  position: 'relative',
}

const STYLE_LIST = [...POSITION_STYLES, ...DIMENSION_STYLES]

const INPUT_STYLE_PROPS_LIST = [...BLOCK_STYLES, 'resize']

export const DEFAULT_INPUT_STYLES: Styles = {
  display: 'block',
  width: 'initial 100% initial',
  height: 'initial initial initial',
  color: {
    '': '#dark.85',
    invalid: '#danger-text',
    focused: '#dark.85',
    disabled: '#dark.30',
  },
  fill: {
    '': '#white',
    disabled: '#dark.04',
  },
  border: {
    '': true,
    focused: true,
    valid: '#success-text.50',
    invalid: '#danger-text.50',
    disabled: true,
  },
  outline: {
    '': '#purple-03.0',
    focused: '#purple-03',
    'invalid & focused': '#danger.50',
    'valid & focused': '#success.50',
  },
  radius: true,
  padding: {
    '': '(1.25x - 1bw) 1x (1.25x - 1bw) (1.5x - 1bw)',
    '[data-size="small"]': '(.75x - 1px) (1.5x - 1px)',
  },
  fontWeight: 400,
  textAlign: 'left',
  reset: 'input',
  preset: 'default',
  flexGrow: 1,
  margin: 0,
  resize: 'none',
}

function BaseInput(props: BaseInputProps, ref) {
  props = useProviderProps(props)
  props = useFormProps(props)

  const {
    qa,
    label,
    labelPosition = 'top',
    labelStyles,
    isRequired,
    necessityIndicator,
    necessityLabel,
    validationState,
    message,
    prefix,
    isDisabled,
    multiLine,
    autoFocus,
    labelProps,
    wrapperProps,
    isLoading,
    loadingIndicator,
    value,
    suffixPosition = 'before',
    wrapperRef,
    requiredMark = true,
    rows = 1,
    tooltip,
    size,
    ...otherProps
  } = props

  let {
    inputStyles = {},
    wrapperStyles = {},
    suffix,
    inputRef,
    inputProps,
  } = props

  const [suffixWidth, setSuffixWidth] = useState(0)
  const [prefixWidth, setPrefixWidth] = useState(0)

  const styles = extractStyles(otherProps, STYLE_LIST)

  const contextStyles = useContextStyles('Input', otherProps)

  inputStyles = extractStyles(otherProps, INPUT_STYLE_PROPS_LIST, {
    ...DEFAULT_INPUT_STYLES,
    ...contextStyles,
    ...inputStyles,
  })

  wrapperStyles = {
    ...WRAPPER_STYLES,
    ...wrapperStyles,
  }

  if (prefix) {
    inputStyles.paddingLeft = `${prefixWidth}px`
  }

  if (validationState || isLoading || suffix) {
    inputStyles.paddingRight = `${suffixWidth}px`
  }

  const ElementType: 'textarea' | 'input' = multiLine ? 'textarea' : 'input'
  const { isFocused, focusProps } = useFocus({ isDisabled })
  const { hoverProps, isHovered } = useHover({ isDisabled })
  const domRef = useRef(null)
  const defaultInputRef = useRef(null)

  inputRef = inputRef || defaultInputRef

  // Expose imperative interface for ref
  useImperativeHandle(ref, () => ({
    ...createFocusableRef(domRef, inputRef),
    select() {
      if (inputRef?.current) {
        inputRef.current.select()
      }
    },
    getInputElement() {
      return inputRef?.current
    },
  }))

  const isInvalid = validationState === 'invalid'

  const validationIcon = isInvalid ? (
    <WarningOutlined style={{ color: 'var(--danger-color)' }} />
  ) : (
    <CheckOutlined style={{ color: 'var(--success-color)' }} />
  )
  const validation = cloneElement(validationIcon)

  suffix =
    typeof suffix === 'string' ? (
      <Block padding="1x right">{suffix}</Block>
    ) : (
      suffix
    )

  // Fix safari bug: https://github.com/philipwalton/flexbugs/issues/270
  if (!inputProps?.placeholder) {
    if (!inputProps) {
      inputProps = {}
    }

    inputProps.placeholder = ' '
  }

  const textField = (
    <Element
      ref={wrapperRef}
      qa={`${qa || 'TextInput'}Wrapper`}
      mods={{
        invalid: isInvalid,
        valid: validationState === 'valid',
        loadable: !!loadingIndicator,
        multiline: multiLine,
      }}
      data-size={size}
      styles={wrapperStyles}
      {...wrapperProps}
    >
      <Element
        qa={qa || 'TextInput'}
        as={ElementType}
        {...mergeProps(inputProps, focusProps, hoverProps)}
        ref={inputRef}
        rows={multiLine ? rows : undefined}
        mods={{
          invalid: isInvalid,
          valid: validationState === 'valid',
          disabled: isDisabled,
          hovered: isHovered,
          focused: isFocused,
        }}
        data-size={size}
        styles={inputStyles}
      />
      <Prefix
        padding="0 1x 0 1.5x"
        onWidthChange={setPrefixWidth}
        opacity={isDisabled ? '@disabled-opacity' : false}
        placeItems="center"
      >
        {typeof prefix === 'string' ? (
          <Block padding="1x left">{prefix}</Block>
        ) : (
          prefix
        )}
      </Prefix>
      <Suffix
        padding="1x left"
        onWidthChange={setSuffixWidth}
        opacity={isDisabled ? '@disabled-opacity' : false}
      >
        {suffixPosition === 'before' ? suffix : null}
        <Space gap={false} padding="0 1.5x 0 0">
          {validationState && !isLoading ? validation : null}
          {isLoading && <LoadingOutlined />}
        </Space>
        {suffixPosition === 'after' ? suffix : null}
      </Suffix>
    </Element>
  )

  return (
    <FieldWrapper
      {...{
        labelPosition,
        label,
        styles,
        isRequired,
        labelStyles,
        necessityIndicator,
        necessityLabel,
        labelProps,
        isDisabled,
        validationState,
        message,
        requiredMark,
        tooltip,
        Component: textField,
        ref: domRef,
      }}
    />
  )
}

const _BaseInput = forwardRef(BaseInput)
export { _BaseInput as BaseInput }
