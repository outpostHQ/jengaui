import React, { forwardRef, useRef } from 'react'
import { useFocusableRef } from '@react-spectrum/utils'
import { useHover } from '@react-aria/interactions'
import { useRadio } from '@react-aria/radio'
import { useRadioProvider } from './context'
import {
  BaseProps,
  Element,
  Styles,
  extractStyles,
  useContextStyles,
  BLOCK_STYLES,
  OUTER_STYLES,
} from 'tastycss-react'
import { filterBaseProps, useProviderProps, useFocus } from '@jenga-ui/core'
import { mergeProps } from '@react-aria/utils'
import {
  useFormProps,
  FormFieldProps,
  HiddenInput,
  INLINE_LABEL_STYLES,
} from '@jenga-ui/form'
import { RadioGroup } from './RadioGroup'
import { AriaRadioProps } from '@react-types/radio'

const STYLES: Styles = {
  position: 'relative',
  display: 'grid',
  placeItems: 'center start',
  gap: '1x',
  flow: 'column',
  preset: 'default',
  width: 'min-content',
}

const BUTTON_STYLES: Styles = {
  radius: true,
  fill: {
    '': '#white',
    hovered: '#purple-text.04',
    disabled: '#dark.04',
  },
  color: {
    '': '#dark.85',
    invalid: '#danger-text',
    disabled: '#dark.40',
  },
  fontWeight: 500,
  preset: 'default',
  border: {
    '': true,
    checked: '#purple-text',
    'invalid & checked': '#danger-text',
    'disabled & checked': '#dark.40',
    disabled: '#border',
  },
  padding: '(1x - 1bw) (1.5x - 1bw)',
  cursor: 'pointer',
  opacity: {
    '': 1,
    disabled: 0.5,
  },
  outline: {
    '': '#purple-03.0',
    focused: '#purple-03',
  },
}

const INPUT_STYLES: Styles = {
  display: 'grid',
  placeItems: 'center',
  radius: 'round',
  fill: {
    '': '#white',
    disabled: '#dark.04',
  },
  color: {
    checked: '#purple-text',
    'invalid & checked': '#danger-text',
    'disabled | !checked': '#clear',
    'disabled & checked': '#dark.12',
  },
  border: {
    '': '#dark.30',
    checked: '#purple-text',
    invalid: '#danger-text.50',
    disabled: '#dark.12',
  },
  width: '2x',
  height: '2x',
  outline: {
    '': '#purple-03.0',
    focused: '#purple-03',
  },
  transition: 'theme',
}

const CIRCLE_STYLES: Styles = {
  radius: 'round',
  width: '1x',
  height: '1x',
  fill: 'currentColor',
  transition: 'theme',
}

export interface JengaRadioProps
  extends BaseProps,
    AriaRadioProps,
    FormFieldProps {
  inputStyles?: Styles
  /* The visual type of the radio button */
  type?: 'button' | 'radio'
}

function Radio(props: JengaRadioProps, ref) {
  props = useProviderProps(props)
  props = useFormProps(props)

  const {
    qa,
    isDisabled,
    validationState,
    children,
    autoFocus,
    labelProps,
    type,
    'aria-label': ariaLabel,
    ...otherProps
  } = props

  let { label, labelStyles, inputStyles } = props

  const isButton = type === 'button'

  label = label || children

  const styles = extractStyles(otherProps, OUTER_STYLES, {
    ...STYLES,
    ...useContextStyles('Radio_Wrapper', props),
  })

  inputStyles = extractStyles(otherProps, BLOCK_STYLES, {
    ...(isButton ? BUTTON_STYLES : INPUT_STYLES),
    ...useContextStyles(isButton ? 'RadioButton' : 'Radio', props),
    ...inputStyles,
  })

  labelStyles = {
    ...INLINE_LABEL_STYLES,
    fontWeight: 400,
    ...useContextStyles('Radio_Label', props),
    ...labelStyles,
  }

  const state = useRadioProvider()

  if (!state) {
    throw new Error('JengaUI: The Radio button is used outside the RadioGroup.')
  }

  const { isFocused, focusProps } = useFocus({ isDisabled }, true)
  const { hoverProps, isHovered } = useHover({ isDisabled })

  const inputRef = useRef(null)
  const domRef = useFocusableRef(ref, inputRef)

  const { inputProps } = useRadio(
    {
      ...props,
      isDisabled,
    },
    state,
    inputRef
  )

  return (
    <Element
      as="label"
      styles={styles}
      {...hoverProps}
      ref={domRef}
      mods={{
        disabled: isDisabled,
        invalid: validationState === 'invalid',
        hovered: isHovered,
        button: isButton,
      }}
    >
      <HiddenInput
        data-qa={qa || 'Radio'}
        aria-label={ariaLabel}
        {...mergeProps(inputProps, focusProps)}
        // isButton={isButton}
        ref={inputRef}
      />
      <Element
        mods={{
          checked: inputProps.checked,
          invalid: validationState === 'invalid',
          valid: validationState === 'valid',
          disabled: isDisabled,
          hovered: isHovered,
          focused: isFocused,
        }}
        styles={inputStyles}
      >
        {!isButton ? (
          <Element
            styles={CIRCLE_STYLES}
            mods={{
              checked: inputProps.checked,
              invalid: validationState === 'invalid',
              valid: validationState === 'valid',
            }}
          />
        ) : (
          children
        )}
      </Element>
      {label && !isButton && (
        <Element
          qa="RadioLabel"
          styles={labelStyles}
          mods={{
            invalid: validationState === 'invalid',
            valid: validationState === 'valid',
            disabled: isDisabled,
          }}
          {...filterBaseProps(labelProps)}
        >
          {label}
        </Element>
      )}
    </Element>
  )
}

function RadioButton(props: JengaRadioProps, ref) {
  const Radio = _Radio

  return <Radio {...props} type="button" ref={ref} />
}

/**
 * Radio buttons allow users to select a single option from a list of mutually exclusive options.
 * All possible options are exposed up front for users to compare.
 */
const _Radio = Object.assign(forwardRef(Radio), {
  Group: RadioGroup,
  Button: forwardRef(RadioButton),
})
export { _Radio as Radio }
export { RadioButton }
