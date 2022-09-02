import { forwardRef, useRef } from 'react';
import { useLocale } from '@react-aria/i18n';
import { useNumberFieldState } from '@react-stately/numberfield';
import { useNumberField } from '@react-aria/numberfield';

import { useFormProps } from '@jenga-ui/form';
import { useProviderProps } from '@jenga-ui/providers';
import {
  JengaTextInputBaseProps,
  TextInputBase,
} from '@jenga-ui/text-input';
import { tasty } from 'tastycss';
import {
  castNullableNumberValue,
  WithNullableValue,
} from '@jenga-ui/utils';

import { StepButton } from './StepButton';

import type { AriaNumberFieldProps } from '@react-types/numberfield';

export interface JengaNumberInputProps
  extends Omit<JengaTextInputBaseProps, 'defaultValue' | 'value' | 'onChange'>,
    AriaNumberFieldProps {
  /** Whether or to hide stepper */
  hideStepper?: boolean;
}

const StepperContainer = tasty({
  styles: {
    display: 'grid',
    gridColumns: '1fr',
    gridRows: 'minmax(1px, 1fr) minmax(1px, 1fr)',
    flow: 'column',
    placeSelf: 'stretch',
  },
});

function NumberInput(props: WithNullableValue<JengaNumberInputProps>, ref) {
  props = castNullableNumberValue(props);
  props = useProviderProps(props);
  props = useFormProps(props);

  let { hideStepper, value, defaultValue, onChange, ...otherProps } = props;
  let showStepper = !hideStepper;
  let { locale } = useLocale();
  let state = useNumberFieldState({ ...props, locale });
  let inputRef = useRef(null);
  let {
    groupProps,
    labelProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);

  return (
    <TextInputBase
      {...otherProps}
      ref={ref}
      labelProps={labelProps}
      inputProps={inputProps}
      inputRef={inputRef}
      wrapperProps={groupProps}
      suffixPosition="after"
      suffix={
        showStepper ? (
          <StepperContainer>
            <StepButton direction="up" {...incrementButtonProps} />
            <StepButton direction="down" {...decrementButtonProps} />
          </StepperContainer>
        ) : null
      }
    />
  );
}

/**
 * NumberFields allow users to enter a number, and increment or decrement the value using stepper buttons.
 */
const _NumberInput = forwardRef(NumberInput);

(_NumberInput as any).jengaInputType = 'Number';

export { _NumberInput as NumberInput };