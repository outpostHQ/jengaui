import { ForwardedRef, forwardRef } from 'react';

import { TextInput } from '@jengaui/text-input';
import { PasswordInput } from '@jengaui/password-input';
import { NumberInput } from '@jengaui/number-input';
import { FileInput } from '@jengaui/file-input';
import { TextArea } from '@jengaui/textarea';

type JengaInput = typeof TextInput & {
  Text: typeof TextInput;
  Password: typeof PasswordInput;
  Number: typeof NumberInput;
  TextArea: typeof TextArea;
  File: typeof FileInput;
};

export const Input: JengaInput = Object.assign(
  forwardRef(function Input(props, ref: ForwardedRef<HTMLInputElement>) {
    return <TextInput ref={ref} {...props} />;
  }),
  {
    Text: TextInput,
    Password: PasswordInput,
    Number: NumberInput,
    TextArea: TextArea,
    File: FileInput,
  },
);
