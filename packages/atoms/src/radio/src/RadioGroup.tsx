import React, { forwardRef } from 'react'
import { useDOMRef } from '@react-spectrum/utils'
import { LABEL_STYLES } from '@jenga-ui/form'
import { useProviderProps } from '@jenga-ui/core'
import { useRadioGroup } from '@react-aria/radio'
import { useRadioGroupState } from '@react-stately/radio'
import {
  FormContext,
  useFormProps,
  FormFieldProps,
  FieldWrapper,
} from '@jenga-ui/form'
import { RadioContext } from './context'
import {
  extractStyles,
  useContextStyles,
  BaseProps,
  Element,
  Styles,
  BLOCK_STYLES,
  OUTER_STYLES,
} from 'tastycss-react'
import { AriaRadioProps } from '@react-types/radio'
import { Orientation } from '@react-types/shared'

const STYLES = {
  display: 'grid',
  gridColumns: {
    '': '1fr',
    'has-sider': 'max-content 1fr',
  },
  gap: {
    '': '0',
    'has-sider': '1x',
  },
  placeItems: 'baseline start',
} as Styles

const GROUP_STYLES = {
  display: 'grid',
  flow: {
    '': 'row',
    horizontal: 'column',
  },
  gap: {
    '': '1x',
    horizontal: '2x',
  },
  padding: '(1x - 1bw) 0',
} as Styles

export interface JengaRadioGroupProps
  extends BaseProps,
    AriaRadioProps,
    FormFieldProps {
  groupStyles?: Styles
  type?: 'button' | 'radio'
  orientation?: Orientation
  tooltip?: string
}

function RadioGroup(props: JengaRadioGroupProps, ref) {
  props = useProviderProps(props)
  props = useFormProps(props)

  const {
    isDisabled,
    isRequired,
    necessityIndicator,
    label,
    labelPosition = 'top',
    validationState,
    children,
    orientation = 'vertical',
    message,
    requiredMark = true,
    tooltip,
    ...otherProps
  } = props

  let { styles, groupStyles, labelStyles } = props

  const domRef = useDOMRef(ref)

  const wrapperContextStyles = useContextStyles('RadioGroup_Wrapper', props)
  const groupContextStyles = useContextStyles('RadioGroup', props)
  const labelContextStyles = useContextStyles('RadioGroup_Label', props)

  styles = extractStyles(otherProps, OUTER_STYLES, {
    ...STYLES,
    ...wrapperContextStyles,
    ...styles,
  })
  groupStyles = extractStyles(otherProps, BLOCK_STYLES, {
    ...GROUP_STYLES,
    ...groupContextStyles,
    ...groupStyles,
  })

  labelStyles = {
    ...LABEL_STYLES,
    ...labelContextStyles,
    ...labelStyles,
  }

  const state = useRadioGroupState(props)
  const { radioGroupProps: fieldProps, labelProps } = useRadioGroup(
    props,
    state
  )

  const radioGroup = (
    <Element
      qa="RadioGroup"
      styles={groupStyles}
      mods={{
        horizontal: orientation === 'horizontal',
      }}
    >
      <FormContext.Provider
        value={{
          isRequired,
          validationState,
          isDisabled,
        }}
      >
        <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
      </FormContext.Provider>
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
        fieldProps,
        isDisabled,
        validationState,
        message,
        requiredMark,
        tooltip,
        Component: radioGroup,
        ref: domRef,
      }}
    />
  )
}

/**
 * Radio groups allow users to select a single option from a list of mutually exclusive options.
 * All possible options are exposed up front for users to compare.
 */
const _RadioGroup = Object.assign(forwardRef(RadioGroup), {
  jengaInputType: 'RadioGroup',
})
export { _RadioGroup as RadioGroup }
