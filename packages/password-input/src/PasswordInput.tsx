import { forwardRef, useCallback, useRef, useState } from 'react';
import { useTextField } from '@react-aria/textfield';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import {
  JengaTextInputBaseProps,
  TextInputBase,
} from '@jengaui/text-input';
import { useProviderProps } from '@jengaui/providers';
import { Button } from '@jengaui/button';
import {
  castNullableStringValue,
  WithNullableValue,
} from '@jengaui/utils';

function PasswordInput(props: WithNullableValue<JengaTextInputBaseProps>, ref) {
  props = castNullableStringValue(props);

  let { suffix, multiLine, ...otherProps } = useProviderProps({ ...props });
  let [type, setType] = useState('password');
  let inputRef = useRef(null);
  let { labelProps, inputProps } = useTextField(
    {
      ...otherProps,
      type,
    },
    inputRef,
  );

  const toggleType = useCallback((e) => {
    setType((type) => (type === 'password' ? 'text' : 'password'));
  }, []);

  const wrappedSuffix = (
    <>
      {suffix}
      <Button
        excludeFromTabOrder
        type="neutral"
        htmlType="button"
        placeSelf="stretch"
        height="auto"
        radius="right"
        width="4x"
        label="Toggle masking"
        icon={type === 'password' ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        onPress={toggleType}
      />
    </>
  );

  return (
    <TextInputBase
      ref={ref}
      labelProps={labelProps}
      inputProps={inputProps}
      inputRef={inputRef}
      inputStyles={{ paddingRight: '4x' }}
      type={type}
      suffixPosition="after"
      suffix={wrappedSuffix}
      multiLine={multiLine}
      {...otherProps}
    />
  );
}

/**
 * PasswordInputs are password inputs that allow users to input passwords or code entries
 * with a keyboard. Various decorations can be displayed around the field to
 * communicate the entry requirements.
 */
const _PasswordInput = forwardRef(PasswordInput);

(_PasswordInput as any).jengaInputType = 'Text';

export { _PasswordInput as PasswordInput };