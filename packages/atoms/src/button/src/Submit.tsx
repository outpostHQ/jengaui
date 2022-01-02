import React, { forwardRef } from 'react'
import { Button } from './Button'
import { useProviderProps } from '@jenga-ui/core'
import { useFormProps } from '@jenga-ui/form'

function Submit(props: any, ref) {
  props = useProviderProps(props)
  props = useFormProps(props)

  const { form, ...otherProps } = props
  const formData = form.getFieldsValue()
  const isValid = !Object.keys(formData).find((name) => {
    return form.isFieldInvalid(name)
  })

  return (
    <Button
      ref={ref}
      type="primary"
      htmlType="submit"
      isLoading={form.isSubmitting}
      isDisabled={!isValid}
      {...otherProps}
    />
  )
}

const _Submit = forwardRef(Submit)
export { _Submit as Submit }
