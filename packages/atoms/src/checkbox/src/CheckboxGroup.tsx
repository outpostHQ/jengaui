import React, { forwardRef } from 'react'
import { useDOMRef } from '@react-spectrum/utils'
import {
  LABEL_STYLES,
  FormContext,
  useFormProps,
  FieldWrapper,
  FormFieldProps,
} from '../../form'
import { useProviderProps } from '@jenga-ui/core'
import { useCheckboxGroup } from '@react-aria/checkbox'
import { useCheckboxGroupState } from '@react-stately/checkbox'
import { CheckboxGroupContext } from './context'
import {
  extractStyles,
  useContextStyles,
  BaseProps,
  Element,
  BLOCK_STYLES,
  OUTER_STYLES,
} from 'tastycss-react'
import { AriaCheckboxGroupProps } from '@react-types/checkbox'

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
}

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
}

export interface JengaCheckboxGroupProps
  extends BaseProps,
    AriaCheckboxGroupProps,
    FormFieldProps {
  orientation?: 'vertical' | 'horizontal'
}

function CheckboxGroup(props: JengaCheckboxGroupProps, ref) {
  props = useProviderProps(props)
  props = useFormProps(props)

  const {
    isDisabled,
    isRequired,
    necessityIndicator,
    necessityLabel,
    label,
    labelPosition = 'top',
    validationState,
    children,
    insideForm,
    orientation = 'vertical',
    message,
    requiredMark = true,
    ...otherProps
  } = props

  let { labelStyles } = props

  const domRef = useDOMRef(ref)

  const wrapperContextStyles = useContextStyles('CheckboxGroup_Wrapper', props)
  const groupContextStyles = useContextStyles('CheckboxGroup', props)
  const labelContextStyles = useContextStyles('CheckboxGroup_Label', props)

  const styles = extractStyles(otherProps, OUTER_STYLES, {
    ...STYLES,
    ...wrapperContextStyles,
  })
  const groupStyles = extractStyles(otherProps, BLOCK_STYLES, {
    ...GROUP_STYLES,
    ...groupContextStyles,
  })

  labelStyles = {
    ...LABEL_STYLES,
    ...labelContextStyles,
    ...labelStyles,
  }

  const state = useCheckboxGroupState(props)
  const { groupProps, labelProps } = useCheckboxGroup(props, state)

  const radioGroup = (
    <Element
      qa="CheckboxGroup"
      styles={groupStyles}
      mods={{
        horizontal: orientation === 'horizontal',
      }}
    >
      <FormContext.Provider
        value={{
          isDisabled,
          validationState,
        }}
      >
        <CheckboxGroupContext.Provider value={state}>
          {children}
        </CheckboxGroupContext.Provider>
      </FormContext.Provider>
    </Element>
  )

  return (
    <FieldWrapper
      {...{
        labelPosition,
        label,
        insideForm,
        styles,
        isRequired,
        labelStyles,
        necessityIndicator,
        necessityLabel,
        labelProps,
        fieldProps: groupProps,
        isDisabled,
        validationState,
        message,
        requiredMark,
        Component: radioGroup,
        ref: domRef,
      }}
    />
  )
}

/**
 * Checkbox groups allow users to select a single option from a list of mutually exclusive options.
 * All possible options are exposed up front for users to compare.
 */
const _CheckboxGroup = Object.assign(forwardRef(CheckboxGroup), {
  jengaInputType: 'CheckboxGroup',
})
export { _CheckboxGroup as CheckboxGroup }
