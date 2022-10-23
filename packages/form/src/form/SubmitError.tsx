import { ReactNode, useContext } from 'react';

import { Alert, JengaAlertProps } from '@jengaui/alert';

import { FormContext } from './Form';

type SubmitErrorProps = {
  submitError?: ReactNode;
};

/**
 * An alert that shows a form error message received from the onSubmit callback.
 */
export function SubmitError(props: JengaAlertProps) {
  const { submitError } = useContext(FormContext) as SubmitErrorProps;

  if (!submitError) {
    return null;
  }

  return (
    <Alert theme="danger" {...props}>
      {submitError}
    </Alert>
  );
}