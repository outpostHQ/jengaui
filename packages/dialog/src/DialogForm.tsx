import { Title, Content, Header } from '@jenga-ui/content';
import {
  JengaFormProps,
  Form,
  useForm,
  FieldTypes,
} from '@jenga-ui/form';
import {
  Submit,
  Button,
  JengaButtonProps,
} from '@jenga-ui/button';
import { ButtonGroup } from '@jenga-ui/button-group';

import { useDialogContext } from './context';
import { Dialog, JengaDialogProps } from './Dialog';

export interface JengaDialogFormProps<T extends FieldTypes = FieldTypes>
  extends JengaDialogProps,
    Omit<JengaFormProps<T>, 'role'> {
  /** Whether the submit button has a `danger` theme */
  danger?: boolean;
  /** Properties for submit button. Use `label` to change text. */
  submitProps?: JengaButtonProps;
  /** Properties for cancel button. Use `label` to change text. */
  cancelProps?: JengaButtonProps;
  /** WIP. Preserve form values even if field is deleted */
  preserve?: boolean;
  /** Whether to hide action button so developer can manually specify them */
  noActions?: boolean;
  /** The title of the dialog */
  title?: string;
}

export interface JengaDialogFormRef {
  open: () => void;
  close: () => void;
}

/**
 * DialogForms are a specific type of Dialog. They contain forms to fill.
 */
export function DialogForm<T extends FieldTypes = FieldTypes>(
  props: JengaDialogFormProps<T>,
) {
  let {
    qa,
    name,
    form,
    defaultValues,
    onDismiss,
    onSubmit,
    onSubmitFailed,
    onValuesChange,
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
    title,
    size,
    closeIcon,
    ...dialogProps
  } = props;

  [form] = useForm(form);

  const { onClose } = useDialogContext();

  function onLocalDismiss() {
    onClose?.();
    onDismiss?.();

    if (!preserve) {
      form?.resetFields();
    }
  }

  return (
    <Dialog
      qa={`${qa || ''}Dialog`}
      size={size}
      closeIcon={closeIcon}
      {...dialogProps}
    >
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>
        <Form<T>
          qa={qa || 'DialogForm'}
          form={form}
          name={name}
          defaultValues={defaultValues}
          labelStyles={labelStyles}
          labelPosition={labelPosition}
          requiredMark={requiredMark}
          isRequired={isRequired}
          necessityIndicator={necessityIndicator}
          necessityLabel={necessityLabel}
          isReadOnly={isReadOnly}
          validationState={validationState}
          validateTrigger={validateTrigger}
          onSubmit={async (data) => {
            await onSubmit?.(data);

            onClose?.();

            if (!preserve) {
              form?.resetFields();
            }
          }}
          onSubmitFailed={onSubmitFailed}
          onValuesChange={onValuesChange}
        >
          {typeof children === 'function' ? children(onLocalDismiss) : children}

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
                label="Cancel"
                onPress={onLocalDismiss}
                {...(cancelProps || {})}
              />
            </ButtonGroup>
          ) : undefined}
        </Form>
      </Content>
    </Dialog>
  );
}