import { useFocusableRef } from '@react-spectrum/utils';
import { forwardRef, useRef } from 'react';
import { useHover } from '@react-aria/interactions';
import { useRadio } from '@react-aria/radio';

import {
  BaseProps,
  extractStyles,
  filterBaseProps,
  OUTER_STYLES,
  Styles,
  tasty,
} from 'tastycss';
import { useFocus, mergeProps } from '@jengaui/utils';
import { useProviderProps } from '@jengaui/providers';
import {
  INLINE_LABEL_STYLES,
  useFormProps,
  HiddenInput,
  FormFieldProps,
} from '@jengaui/form';

import { RadioGroup } from './RadioGroup';
import { useRadioProvider } from './context';

import type { AriaRadioProps } from '@react-types/radio';

const RadioWrapperElement = tasty({
  as: 'label',
  qa: 'RadioWrapper',
  styles: {
    position: 'relative',
    display: 'grid',
    placeItems: 'center start',
    gap: '1x',
    flow: 'column',
    preset: 'default',
    width: 'min-content',
  },
});

const RadioButtonElement = tasty({
  styles: {
    radius: true,
    fill: {
      '': '#white',
      hovered: '#purple-text.04',
      disabled: '#dark.04',
    },
    color: {
      '': '#dark.85',
      invalid: '#danger-text',
      disabled: '#dark.40',
    },
    fontWeight: 500,
    preset: 'default',
    border: {
      '': true,
      checked: '#purple-text',
      'invalid & checked': '#danger-text',
      'disabled & checked': '#dark.40',
      disabled: '#border',
    },
    padding: '(1x - 1bw) (1.5x - 1bw)',
    cursor: 'pointer',
    opacity: {
      '': 1,
      disabled: 0.5,
    },
    outline: {
      '': '#purple-03.0',
      focused: '#purple-03',
    },
  },
});

const RadioNormalElement = tasty({
  styles: {
    display: 'grid',
    placeItems: 'center',
    radius: 'round',
    fill: {
      '': '#white',
      disabled: '#dark.04',
    },
    color: {
      checked: '#purple-text',
      'invalid & checked': '#danger-text',
      'disabled | !checked': '#clear',
      'disabled & checked': '#dark.12',
    },
    border: {
      '': '#dark.30',
      checked: '#purple-text',
      invalid: '#danger-text.50',
      disabled: '#dark.12',
    },
    width: '2x',
    height: '2x',
    outline: {
      '': '#purple-03.0',
      focused: '#purple-03',
    },
    transition: 'theme',

    RadioCircle: {
      display: 'block',
      radius: 'round',
      width: '1x',
      height: '1x',
      fill: 'currentColor',
      transition: 'theme',
    },
  },
});

const RadioCircleElement = <div data-element="RadioCircle" />;

const RadioLabelElement = tasty({
  qa: 'RadioLabel',
  styles: {
    ...INLINE_LABEL_STYLES,
    fontWeight: 400,
  },
});

export interface JengaRadioProps
  extends BaseProps,
    AriaRadioProps,
    FormFieldProps {
  inputStyles?: Styles;
  /* The visual type of the radio button */
  type?: 'button' | 'radio';
}

function Radio(props: JengaRadioProps, ref) {
  props = useProviderProps(props);
  props = useFormProps(props);

  let {
    qa,
    isDisabled,
    validationState,
    children,
    label,
    autoFocus,
    labelStyles,
    labelProps,
    inputStyles,
    type,
    'aria-label': ariaLabel,
    ...otherProps
  } = props;

  let isButton = type === 'button';

  label = label || children;

  let styles = extractStyles(otherProps, OUTER_STYLES);

  const RadioElement = isButton ? RadioButtonElement : RadioNormalElement;

  labelStyles = {
    ...INLINE_LABEL_STYLES,
    fontWeight: 400,
    ...labelStyles,
  };

  let state = useRadioProvider();

  if (!state) {
    throw new Error(
      'JengaUI: The Radio button is used outside the RadioGroup.',
    );
  }

  let { isFocused, focusProps } = useFocus({ isDisabled }, true);
  let { hoverProps, isHovered } = useHover({ isDisabled });

  let inputRef = useRef(null);
  let domRef = useFocusableRef(ref, inputRef);

  let { inputProps } = useRadio(
    {
      ...props,
      isDisabled,
    },
    state,
    inputRef,
  );

  return (
    <RadioWrapperElement
      styles={styles}
      {...hoverProps}
      ref={domRef}
      mods={{
        disabled: isDisabled,
        invalid: validationState === 'invalid',
        hovered: isHovered,
        button: isButton,
      }}
    >
      <HiddenInput
        data-qa={qa || 'Radio'}
        aria-label={ariaLabel}
        {...mergeProps(inputProps, focusProps)}
        ref={inputRef}
        isButton={isButton}
      />
      <RadioElement
        mods={{
          checked: inputProps.checked,
          invalid: validationState === 'invalid',
          valid: validationState === 'valid',
          disabled: isDisabled,
          hovered: isHovered,
          focused: isFocused,
        }}
        styles={inputStyles}
      >
        {!isButton ? RadioCircleElement : children}
      </RadioElement>
      {label && !isButton && (
        <RadioLabelElement
          mods={{
            invalid: validationState === 'invalid',
            valid: validationState === 'valid',
            disabled: isDisabled,
          }}
          {...filterBaseProps(labelProps)}
        >
          {label}
        </RadioLabelElement>
      )}
    </RadioWrapperElement>
  );
}

function RadioButton(props: JengaRadioProps, ref) {
  const Radio = _Radio;

  return <Radio {...props} ref={ref} type="button" />;
}

/**
 * Radio buttons allow users to select a single option from a list of mutually exclusive options.
 * All possible options are exposed up front for users to compare.
 */
const _Radio = forwardRef(Radio);
/**
 * Radio buttons allow users to select a single option from a list of mutually exclusive options.
 * All possible options are exposed up front for users to compare.
 */
const _RadioButton = forwardRef(RadioButton);

const __Radio = Object.assign(
  _Radio as typeof _Radio & {
    Group: typeof RadioGroup;
    Button: typeof _RadioButton;
  },
  {
    Group: RadioGroup,
    Button: _RadioButton,
  },
);

export { __Radio as Radio };
export { _RadioButton as RadioButton };
