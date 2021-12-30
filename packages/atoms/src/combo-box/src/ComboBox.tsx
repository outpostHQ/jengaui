import {
  CheckOutlined,
  LoadingOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { mergeProps } from '@react-aria/utils'
import React, { cloneElement, forwardRef, RefObject, useState } from 'react'
import { useComboBoxState } from '@react-stately/combobox'
import { useComboBox } from '@react-aria/combobox'
import { useButton } from '@react-aria/button'
import { useFormProps } from '@jenga-ui/form'
import { useHover } from '@react-aria/interactions'
import { useProviderProps } from '@jenga-ui/core'
import { useFilter } from '@react-aria/i18n'
import { Element } from 'tastycss-react'
import { extractStyles } from 'tastycss-react'
import { BLOCK_STYLES, OUTER_STYLES, Styles } from 'tastycss-react'
import { useFocus } from '@jenga-ui/core'
import { useContextStyles } from 'tastycss-react'
import {
  modAttrs,
  useCombinedRefs,
  Prefix,
  Suffix,
  Space,
} from '@jenga-ui/core'
import { Item } from '@react-stately/collections'
import { FieldWrapper } from '@jenga-ui/form'
import { JengaSelectBaseProps, ListBoxPopup } from '@jenga-ui/select'
import { DEFAULT_INPUT_STYLES } from '@jenga-ui/base-input'
import { useOverlayPosition } from '@react-aria/overlays'
import { OverlayWrapper } from '@jenga-ui/overlays'
import {
  CollectionBase,
  KeyboardDelegate,
  LoadingState,
} from '@react-types/shared'
import { ComboBoxProps } from '@react-types/combobox'

const CaretDownIcon = () => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.49 4.102H2.51c-.269 0-.42.284-.253.478l4.49 5.206a.342.342 0 00.506 0l4.49-5.206c.167-.194.016-.478-.253-.478z"
      fill="currentColor"
    />
  </svg>
)

const COMBOBOX_STYLES: Styles = {
  position: 'relative',
  display: 'grid',
} as const

const INPUT_STYLES: Styles = {
  ...DEFAULT_INPUT_STYLES,
  width: '100%',
} as const

const TRIGGER_STYLES: Styles = {
  display: 'grid',
  placeItems: 'center',
  placeContent: 'center',
  placeSelf: 'stretch',
  radius: 'right',
  padding: '0 1x',
  color: 'inherit',
  border: 0,
  fill: {
    '': '#purple.0',
    hovered: '#dark.04',
    pressed: '#dark.08',
    disabled: '#clear',
  },
  cursor: 'pointer',
} as const

export interface CubeComboBoxProps<T>
  extends Omit<JengaSelectBaseProps<T>, 'onOpenChange'>,
    ComboBoxProps<T>,
    CollectionBase<T> {
  multiLine?: boolean
  autoComplete?: string
  inputRef?: RefObject<HTMLInputElement>
  /** The ref for the list box popover. */
  popoverRef?: RefObject<HTMLDivElement>
  /** The ref for the list box. */
  listBoxRef?: RefObject<HTMLElement>
  /** An optional keyboard delegate implementation, to override the default. */
  keyboardDelegate?: KeyboardDelegate
  loadingState?: LoadingState
  filter?: (val: any, str: string) => boolean
  size?: 'small' | 'default' | 'large' | string
}

function ComboBox<T extends object>(props: CubeComboBoxProps<T>, ref) {
  props = useProviderProps(props)
  props = useFormProps(props)

  const {
    qa,
    label,
    labelPosition = 'top',
    labelStyles,
    isRequired,
    necessityIndicator,
    validationState,
    prefix,
    isDisabled,
    multiLine,
    autoFocus,
    isLoading,
    loadingIndicator,
    overlayOffset = 8,
    optionStyles,
    suffix,
    disallowEmptySelection,
    listBoxStyles,
    overlayStyles,
    hideTrigger,
    message,
    size,
    autoComplete = 'off',
    direction = 'bottom',
    shouldFlip = true,
    requiredMark = true,
    menuTrigger = 'input',
    loadingState,
    filter,
    styles,
    ...otherProps
  } = props

  let {
    inputRef,
    triggerRef,
    popoverRef,
    listBoxRef,
    inputStyles,
    triggerStyles,
  } = props

  const isAsync = loadingState != null
  const { contains } = useFilter({ sensitivity: 'base' })
  const [suffixWidth, setSuffixWidth] = useState(0)
  const [prefixWidth, setPrefixWidth] = useState(0)
  const state = useComboBoxState({
    ...props,
    defaultFilter: filter || contains,
    allowsEmptyCollection: isAsync,
  })

  const outerStyles = extractStyles(otherProps, OUTER_STYLES, {
    ...COMBOBOX_STYLES,
    ...useContextStyles('ComboBox_Wrapper', props),
    ...styles,
  })

  inputStyles = extractStyles(otherProps, BLOCK_STYLES, {
    ...INPUT_STYLES,
    ...useContextStyles('ComboBox', props),
    ...inputStyles,
  })

  triggerStyles = {
    ...TRIGGER_STYLES,
    ...useContextStyles('ComboBox_Trigger', props),
    ...triggerStyles,
  }

  ref = useCombinedRefs(ref)
  inputRef = useCombinedRefs(inputRef)
  triggerRef = useCombinedRefs(triggerRef)
  popoverRef = useCombinedRefs(popoverRef)
  listBoxRef = useCombinedRefs(listBoxRef)

  const {
    labelProps,
    inputProps,
    listBoxProps,
    buttonProps: triggerProps,
  } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef: triggerRef,
      listBoxRef,
      popoverRef,
      menuTrigger,
    },
    state
  )

  const { overlayProps, placement } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: popoverRef,
    scrollRef: listBoxRef,
    placement: `${direction} end`,
    shouldFlip: shouldFlip,
    isOpen: state.isOpen,
    onClose: state.close,
    offset: overlayOffset,
  })

  if (prefix) {
    inputStyles.paddingLeft = `${prefixWidth}px`
  }

  inputStyles.paddingRight = `${suffixWidth}px`

  const { isFocused, focusProps } = useFocus({ isDisabled })
  const { hoverProps, isHovered } = useHover({ isDisabled })

  // Get props for the button based on the trigger props from useComboBox
  const { buttonProps, isPressed: isTriggerPressed } = useButton(
    triggerProps,
    triggerRef
  )
  const { hoverProps: triggerHoverProps, isHovered: isTriggerHovered } =
    useHover({ isDisabled })
  const { focusProps: triggerFocusProps, isFocused: isTriggerFocused } =
    useFocus({ isDisabled }, true)

  const isInvalid = validationState === 'invalid'

  const validationIcon = isInvalid ? (
    <WarningOutlined style={{ color: 'var(--danger-color)' }} />
  ) : (
    <CheckOutlined style={{ color: 'var(--success-color)' }} />
  )
  const validation = cloneElement(validationIcon)

  const comboBoxWidth = inputRef?.current?.offsetWidth

  const comboBoxField = (
    <Element
      ref={ref}
      qa="ComboBoxWrapper"
      {...modAttrs({
        invalid: isInvalid,
        valid: validationState === 'valid',
        disabled: isDisabled,
        hovered: isHovered,
        focused: isFocused,
      })}
      styles={outerStyles}
      style={{
        zIndex: isFocused ? 1 : 'initial',
      }}
      data-size={size}
    >
      <Element
        qa={qa || 'ComboBox'}
        as="input"
        {...mergeProps(inputProps, hoverProps, focusProps)}
        ref={inputRef}
        autoComplete={autoComplete}
        styles={inputStyles}
        {...modAttrs({
          invalid: isInvalid,
          valid: validationState === 'valid',
          disabled: isDisabled,
          hovered: isHovered,
          focused: isFocused,
        })}
        data-size={size}
      />
      {prefix ? (
        <Prefix
          onWidthChange={setPrefixWidth}
          padding="0 1x 0 1.5x"
          opacity={isDisabled ? '@disabled-opacity' : false}
          placeItems="center"
          outerGap={0}
        >
          {prefix}
        </Prefix>
      ) : null}
      <Suffix
        onWidthChange={setSuffixWidth}
        opacity={isDisabled ? '@disabled-opacity' : false}
      >
        {validationState || isLoading ? (
          <Space gap={false} padding="0 1x">
            {validationState && !isLoading ? validation : null}
            {isLoading && <LoadingOutlined />}
          </Space>
        ) : null}
        {suffix}
        {!hideTrigger ? (
          <Element
            as="button"
            {...mergeProps(buttonProps, triggerFocusProps, triggerHoverProps)}
            {...modAttrs({
              pressed: isTriggerPressed,
              focused: isTriggerFocused,
              hovered: isTriggerHovered,
              disabled: isDisabled,
            })}
            data-size={size}
            isDisabled={isDisabled}
            ref={triggerRef}
            styles={triggerStyles}
          >
            <CaretDownIcon />
          </Element>
        ) : null}
      </Suffix>
      <OverlayWrapper isOpen={state.isOpen && !isDisabled}>
        <ListBoxPopup
          {...listBoxProps}
          listBoxRef={listBoxRef}
          popoverRef={popoverRef}
          overlayProps={overlayProps}
          shouldUseVirtualFocus
          placement={placement}
          state={state}
          disallowEmptySelection={disallowEmptySelection}
          listBoxStyles={listBoxStyles}
          overlayStyles={overlayStyles}
          optionStyles={optionStyles}
          minWidth={comboBoxWidth}
        />
      </OverlayWrapper>
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
        labelProps,
        isDisabled,
        validationState,
        message,
        requiredMark,
        Component: comboBoxField,
        ref: ref,
      }}
    />
  )
}

const _ComboBox = Object.assign(forwardRef(ComboBox), {
  cubeInputType: 'ComboBox',
  Item,
})
export { _ComboBox as ComboBox }
