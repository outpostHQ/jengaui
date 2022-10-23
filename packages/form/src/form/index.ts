import { JengaAlertProps } from '@jengaui/alert';

import { Field } from './Field';
import { SubmitError } from './SubmitError';
import { useForm } from './useForm';
import { useFormProps, FormContext, Form as _Form } from './Form';

const Form = Object.assign(
  _Form as typeof _Form & {
    Item: typeof Field;
    SubmitError: typeof SubmitError;
    useForm: typeof useForm;
  },
  { Item: Field, useForm, SubmitError },
);

export { useFormProps, Form, Field, useForm, FormContext, SubmitError };
export type { JengaFormProps } from './Form';
export type { JengaFormInstance } from './useForm';
export type { FieldTypes, Fields } from './types';
export type { JengaAlertProps as JengaSubmitErrorProps };