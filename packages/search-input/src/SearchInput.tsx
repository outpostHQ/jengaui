import { forwardRef, useRef } from 'react';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useSearchFieldState } from '@react-stately/searchfield';
import { useSearchField } from '@react-aria/searchfield';

import {
  JengaTextInputBaseProps,
  TextInputBase,
} from '@jengaui/text-input';
import { useProviderProps } from '@jengaui/providers';
import { Button, ariaToJengaButtonProps } from '@jengaui/button';
import {
  castNullableStringValue,
  WithNullableValue,
} from '@jengaui/utils';
import { tasty } from 'tastycss';

export interface JengaSearchInputProps extends JengaTextInputBaseProps {
  /** Whether the search input is clearable using ESC keyboard button or clear button inside the input */
  isClearable?: boolean;
}

const ClearButton = tasty(Button, {
  icon: <CloseOutlined />,
  styles: {
    radius: 'right (1r - 1bw)',
    width: '4x',
    height: 'auto',
    placeSelf: 'stretch',
  },
});

export const SearchInput = forwardRef(function SearchInput(
  props: WithNullableValue<JengaSearchInputProps>,
  ref,
) {
  props = castNullableStringValue(props);
  props = useProviderProps(props);

  let { isClearable, validationState } = props;

  let inputRef = useRef(null);

  let state = useSearchFieldState(props);
  let { inputProps, clearButtonProps } = useSearchField(props, state, inputRef);

  return (
    <TextInputBase
      ref={ref}
      inputProps={inputProps}
      inputRef={inputRef}
      type="search"
      icon={<SearchOutlined />}
      suffixPosition="after"
      suffix={
        isClearable &&
        state.value !== '' &&
        !props.isReadOnly && (
          <ClearButton
            type={validationState === 'invalid' ? 'clear' : 'neutral'}
            theme={validationState === 'invalid' ? 'danger' : undefined}
            {...ariaToJengaButtonProps(clearButtonProps)}
          />
        )
      }
      {...props}
    />
  );
});