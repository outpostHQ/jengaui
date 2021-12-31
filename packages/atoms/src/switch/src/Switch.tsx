import React, { forwardRef, useRef } from 'react'
import { useFocusableRef } from '@react-spectrum/utils'
import { useSwitch } from '@react-aria/switch'
import { useHover } from '@react-aria/interactions'
import { useToggleState } from '@react-stately/toggle'
import { useFocus, filterBaseProps, useProviderProps } from '@jenga-ui/core'
import {
  extractStyles,
  useContextStyles,
  BaseProps,
  BlockStyleProps,
  OuterStyleProps,
  Element,
  Styles,
  BLOCK_STYLES,
  OUTER_STYLES,
} from 'tastycss-react'
import { mergeProps } from '@react-aria/utils'
import {
  useFormProps,
  FieldWrapper,
  FormFieldProps,
  HiddenInput,
  INLINE_LABEL_STYLES,
  LABEL_STYLES,
} from '@jenga-ui/form'
import { LoadingOutlined } from '@ant-design/icons'
import { AriaSwitchProps } from '@react-types/switch'

const STYLES: Styles = {
  position: 'relative',
  display: 'flex',
  placeItems: 'center start',
  gap: '1x',
  flow: 'row',
  preset: 'input',
  width: 'min-content',
  cursor: 'pointer',
}

const INPUT_STYLES: Styles = {
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  radius: 'round',
  fill: {
    '': '#dark.50',
    checked: '#purple',
    disabled: '#dark.12',
  },
  color: '#white',
  border: false,
  width: '5.25x 5.25x',
  height: '3x 3x',
  outline: {
    '': '#purple-03.0',
    focused: '#purple-03',
  },
  transition: 'theme',
  cursor: 'pointer',
}

const THUMB_STYLES: Styles = {
  position: 'absolute',
  width: '2.5x',
  height: '2.5x',
  radius: 'round',
  fill: 'currentColor',
  shadow: '0px 2px 4px #dark.20;',
  top: '.25x',
  left: {
    '': '.25x',
    checked: '2.5x',
  },
  transition: 'left',
  cursor: 'pointer',
}

export interface JengaSwitchProps
  extends BaseProps,
    OuterStyleProps,
    BlockStyleProps,
    FormFieldProps,
    AriaSwitchProps {
  thumbStyles?: Styles
  inputStyles?: Styles
  isLoading?: boolean
}

function Switch(props: JengaSwitchProps, ref) {
  props = useProviderProps(props)
  props = useFormProps(props)

  const {
    qa,
    isDisabled = false,
    autoFocus,
    children,
    labelProps,
    isLoading,
    insideForm,
    validationState,
    message,
    labelPosition,
    requiredMark = true,
    // tooltip,
    ...otherProps
  } = props

  let { label, labelStyles, thumbStyles, inputStyles } = props

  label = label || children

  const wrapperContextStyles = useContextStyles('Switch_Wrapper', props)
  const inputContextStyles = useContextStyles('Switch', props)
  const labelContextStyles = useContextStyles('Switch_Label', props)
  const thumbContextStyles = useContextStyles('Switch_Thumb', props)

  const styles = extractStyles(props, OUTER_STYLES, {
    ...(insideForm ? {} : STYLES),
    ...wrapperContextStyles,
  })
  inputStyles = extractStyles(props, BLOCK_STYLES, {
    ...INPUT_STYLES,
    ...inputContextStyles,
    ...(insideForm && labelPosition === 'side'
      ? {
          marginTop: '-3px',
          placeSelf: 'start',
        }
      : null),
    ...inputStyles,
  })

  thumbStyles = {
    ...THUMB_STYLES,
    ...thumbContextStyles,
    ...thumbStyles,
  }

  labelStyles = {
    ...(insideForm ? LABEL_STYLES : INLINE_LABEL_STYLES),
    ...labelContextStyles,
    ...labelStyles,
  }

  const { isFocused, focusProps } = useFocus({ isDisabled }, true)
  const { hoverProps, isHovered } = useHover({ isDisabled })

  const inputRef = useRef(null)
  const domRef = useFocusableRef(ref, inputRef)

  const { inputProps } = useSwitch(props, useToggleState(props), inputRef)

  const switchField = (
    <Element qa={`${qa || 'Switch'}Wrapper`} styles={{ position: 'relative' }}>
      <HiddenInput
        data-qa={qa || 'Switch'}
        {...mergeProps(inputProps, focusProps)}
        ref={inputRef}
      />
      <Element
        mods={{
          checked: inputProps.checked,
          disabled: isDisabled,
          hovered: isHovered,
          focused: isFocused,
        }}
        styles={inputStyles}
      >
        <Element
          qa="SwitchThumb"
          styles={thumbStyles}
          aria-hidden="true"
          mods={{
            checked: inputProps.checked,
          }}
        />
      </Element>
    </Element>
  )

  if (insideForm) {
    return (
      <FieldWrapper
        {...{
          as: 'label',
          labelPosition,
          label,
          styles,
          labelStyles,
          labelProps,
          isDisabled,
          validationState,
          message,
          requiredMark,
          // tooltip,
          Component: switchField,
          ref: domRef,
        }}
      />
    )
  }

  return (
    <Element
      as="label"
      styles={styles}
      {...hoverProps}
      {...filterBaseProps(otherProps)}
      ref={domRef}
    >
      {switchField}
      {label && (
        <Element
          styles={labelStyles}
          mods={{
            disabled: isDisabled,
          }}
          {...filterBaseProps(labelProps)}
        >
          {label}
          {isLoading ? (
            <>
              {label ? <>&nbsp;</> : null}
              <LoadingOutlined />
            </>
          ) : null}
        </Element>
      )}
    </Element>
  )
}

/**
 * Switches allow users to turn an individual option on or off.
 * They are usually used to activate or deactivate a specific setting.
 */
const _Switch = Object.assign(forwardRef(Switch), {
  jengaInputType: 'Checkbox',
})
export { _Switch as Switch }
