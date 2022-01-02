import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
} from 'react'
import { DialogContainer } from './DialogContainer'
import { Dialog, JengaDialogProps } from './Dialog'
import { Title } from '@jenga-ui/title'
import { Divider } from '@jenga-ui/content'
import { FormProps, Form } from '@jenga-ui/form'
import { Content } from '@jenga-ui/content'
import { Submit, Button, ButtonProps } from '@jenga-ui/button'
import { ButtonGroup } from '@jenga-ui/button-group'

export interface JengaDialogFormProps
  extends Partial<JengaDialogProps>,
    Omit<FormProps, 'role' | 'size'> {
  danger?: boolean
  submitProps?: ButtonProps
  cancelProps?: ButtonProps
  preserve?: boolean
}

export interface JengaDialogFormRef {
  open: () => void
  close: () => void
}

const DialogForm = (props: any, ref: ForwardedRef<JengaDialogFormRef>) => {
  const {
    qa,
    name,
    defaultValues,
    onDismiss,
    onSubmit,
    onValuesChange,
    onSubmitFailed,
    labelStyles,
    labelPosition,
    requiredMark,
    isRequired,
    necessityIndicator,
    necessityLabel,
    isReadOnly,
    validationState,
    validateTrigger,
    children,
    danger,
    noActions,
    submitProps,
    cancelProps,
    preserve,
  } = props

  let { form } = props

  const [_form] = Form.useForm(form)
  form = _form

  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    open() {
      setOpen(true)
    },
    close() {
      setOpen(false)
    },
  }))

  return (
    <DialogContainer
      onDismiss={() => {
        onDismiss()
        setOpen(false)
      }}
    >
      {open && (
        <Dialog qa={`${qa || ''}Dialog`} isDismissable={true}>
          <Title>Delete deployment</Title>
          <Divider />
          <Content>
            <Form
              qa={qa || 'DialogForm'}
              form={form}
              name={name}
              onSubmit={async (data) => {
                await onSubmit(data)
                setOpen(false)

                if (!preserve) {
                  form.resetFields()
                }
              }}
              onSubmitFailed={onSubmitFailed}
              defaultValues={defaultValues}
              onValuesChange={onValuesChange}
              labelStyles={labelStyles}
              labelPosition={labelPosition}
              requiredMark={requiredMark}
              isRequired={isRequired}
              necessityIndicator={necessityIndicator}
              necessityLabel={necessityLabel}
              isReadOnly={isReadOnly}
              validationState={validationState}
              validateTrigger={validateTrigger}
            >
              {typeof children === 'function'
                ? children(() => setOpen(false))
                : children}
              {!noActions ? (
                <ButtonGroup>
                  <Submit
                    qa={`${qa || ''}SubmitButton`}
                    theme={danger ? 'danger' : undefined}
                    label="Submit"
                    {...(submitProps || {})}
                  />
                  <Button
                    qa={`${qa || ''}CancelButton`}
                    onPress={() => setOpen(false)}
                    label="Cancel"
                    {...(cancelProps || {})}
                  />
                </ButtonGroup>
              ) : undefined}
            </Form>
          </Content>
        </Dialog>
      )}
    </DialogContainer>
  )
}

/**
 * DialogForms are a specific type of Dialog. They contain forms to fill.
 */
const _DialogForm = forwardRef(DialogForm)
export { _DialogForm as DialogForm }
