import React, { forwardRef, useRef } from 'react'
import { useFormProps } from '@jenga-ui/form'
import { useProviderProps } from '@jenga-ui/core'
import { useLocale } from '@react-aria/i18n'
import { BaseInputProps, BaseInput } from '@jenga-ui/base-input'
import { useNumberFieldState } from '@react-stately/numberfield'
import { useNumberField } from '@react-aria/numberfield'
import { Element } from 'tastycss-react'
import { StepButton } from './StepButton'
import { AriaNumberFieldProps } from '@react-types/numberfield'

export interface JengaNumberInputProps
  extends Omit<BaseInputProps, 'defaultValue' | 'value' | 'onChange'>,
    AriaNumberFieldProps {}

function NumberInput(props: any, ref) {
  props = useProviderProps(props)
  props = useFormProps(props)

  const { hideStepper } = props
  const showStepper = !hideStepper
  const { locale } = useLocale()
  const state = useNumberFieldState({ ...props, locale })
  const inputRef = useRef(null)
  const {
    groupProps,
    labelProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef)

  return (
    <BaseInput
      {...props}
      labelProps={labelProps}
      inputProps={inputProps}
      ref={ref}
      inputRef={inputRef}
      wrapperProps={groupProps}
      suffixPosition="after"
      suffix={
        showStepper ? (
          <Element
            styles={{
              display: 'grid',
              gridColumns: '1fr',
              gridRows: 'minmax(1px, 1fr) minmax(1px, 1fr)',
              flow: 'column',
              placeSelf: 'stretch',
            }}
          >
            <StepButton direction="up" {...incrementButtonProps} />
            <StepButton direction="down" {...decrementButtonProps} />
          </Element>
        ) : null
      }
    />
  )
}

/**
 * NumberFields allow users to enter a number, and increment or decrement the value using stepper buttons.
 */
const _NumberInput = Object.assign(forwardRef(NumberInput), {
  jengaInputType: 'Number',
})
export { _NumberInput as NumberInput }
