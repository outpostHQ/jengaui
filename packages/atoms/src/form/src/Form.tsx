import { useDOMRef } from '@react-spectrum/utils'
import React, { useEffect, forwardRef } from 'react'
import { extractStyles, CONTAINER_STYLES, Element } from 'tastycss-react'
import {
  filterBaseProps,
  useCombinedRefs,
  timeout,
  useProviderProps,
  Provider,
} from '@jenga-ui/core'
// import { extractStyles } from '../../../utils/styles'
import { useForm } from './useForm'
import { FormProps } from './FormProps'
import { FormContext } from './useFormProps'

const formPropNames = new Set([
  'action',
  'autoComplete',
  'encType',
  'method',
  'target',
])

const DEFAULT_STYLES = {
  display: 'block',
  flow: 'column',
  gap: '2x',
}

function Form(props: FormProps, ref) {
  props = useProviderProps(props)
  const {
    qa,
    name,
    children,
    labelPosition = 'top',
    isRequired,
    necessityIndicator,
    isDisabled,
    isReadOnly,
    validationState,
    labelStyles,
    validateTrigger,
    defaultValues,
    onValuesChange,
    requiredMark = true,
    onSubmit,
    onSubmitFailed,
    ...otherProps
  } = props
  let { form } = props

  ref = useCombinedRefs(ref)

  let onSubmitCallback

  if ((onSubmit || onSubmitFailed) && !otherProps.action) {
    onSubmitCallback = (e) => {
      if (e && e?.preventDefault) {
        e && e?.preventDefault && e?.preventDefault()
        e && e?.stopPropagation && e?.stopPropagation()

        if (e.nativeEvent) {
          const evt = e.nativeEvent

          if (
            evt.submitter &&
            evt.submitter.getAttribute('type') !== 'submit'
          ) {
            return
          }
        }
      }

      return form?.validateFields().then(
        async () => {
          await timeout()

          if (form) {
            onSubmit && onSubmit(form.getFieldsValue())
          }
        },
        async (e) => {
          await timeout()
          if (e instanceof Error) {
            throw e
          }
          // errors are shown
          // transfer errors to the callback
          onSubmitFailed && onSubmitFailed(e)
        }
      )

      // output data from form directly
      // onSubmit(Object.fromEntries(new FormData(e.target).entries()));
    }
  }

  const [_form] = useForm(form, ref && ref.current, {
    onSubmit: onSubmitCallback,
    onValuesChange,
  })

  form = _form

  const styles = extractStyles(otherProps, CONTAINER_STYLES, DEFAULT_STYLES)

  const domRef = useDOMRef(ref)

  const ctx = {
    labelPosition,
    labelStyles,
    necessityIndicator,
    validateTrigger,
    requiredMark,
    form,
    idPrefix: name,
  }

  useEffect(() => {
    if (form && defaultValues) {
      form.setInitialFieldValues(defaultValues)
      form.resetFields()
    }
  }, [])

  return (
    <Element
      as="form"
      qa="Form"
      {...filterBaseProps(otherProps, { propNames: formPropNames })}
      onSubmit={onSubmitCallback}
      noValidate
      styles={styles}
      ref={domRef}
      mods={{
        'has-sider': labelPosition === 'side',
      }}
    >
      <FormContext.Provider value={ctx}>
        <Provider
          insideForm={true}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          validationState={validationState}
        >
          {children}
        </Provider>
      </FormContext.Provider>
    </Element>
  )
}

/**
 * Forms allow users to enter data that can be submitted while providing alignment and styling for form fields.
 */
const _Form = Object.assign(forwardRef(Form), { useForm })
export { _Form as Form }
