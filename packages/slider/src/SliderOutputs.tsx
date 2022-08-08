import { Block, Flex } from '@jenga-ui/core';
import { SliderState } from '@react-stately/slider';
import { OutputHTMLAttributes } from 'react';
import { BaseProps } from 'tastycss';

type JengaSliderOutputProps = OutputHTMLAttributes<HTMLOutputElement> & {
  thumbs: 1 | 2;
  state: SliderState;
};

const StylesFromState = (state: SliderState) => {
  const length =
    Math.max(
      state.getFormattedValue(state.getThumbMaxValue(0)).length,
      state.getFormattedValue(state.getThumbMinValue(0)).length,
    ) + 'ch';
  return state.orientation === 'vertical'
    ? { width: length }
    : { width: length };
};

export const TrackPrefixOutput = (props: JengaSliderOutputProps) => {
  const { thumbs, state, ...outputProps } = props;
  return (
    <Block styles={StylesFromState(state)}>
      <output {...outputProps}>{state.getThumbValueLabel(0)}</output>
    </Block>
  );
};

export const TrackSuffixOutput = (props: JengaSliderOutputProps) => {
  const { thumbs, state, ...outputProps } = props;
  return (
    <Block styles={StylesFromState(state)}>
      {thumbs === 1 ? (
        <output {...outputProps}>
          {state.getFormattedValue(state.getThumbMaxValue(0))}
        </output>
      ) : (
        <output {...outputProps}>{state.getThumbValueLabel(1)}</output>
      )}
    </Block>
  );
};

export const WithOutputs = (
  props: JengaSliderOutputProps &
    BaseProps & {
      withoutOutputs?: boolean;
    },
) => {
  const {
    thumbs,
    state,
    children,
    styles,
    mods,
    withoutOutputs = false,
    ...outputProps
  } = props;
  if (withoutOutputs) return <>{children}</>;
  return (
    <Flex
      mods={mods}
      styles={{
        ...{
          flexDirection:
            state.orientation === 'vertical' ? 'column-reverse' : 'row',
          width: {},
          height: {},
          alignItems: 'center',
          justifyContent: 'center',
        },
        ...styles,
      }}
    >
      <TrackPrefixOutput thumbs={thumbs} state={state} {...outputProps} />
      {children}
      <TrackSuffixOutput thumbs={thumbs} state={state} {...outputProps} />
    </Flex>
  );
};
