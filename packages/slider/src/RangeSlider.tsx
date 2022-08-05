import { useSliderState } from '@react-stately/slider';
import { forwardRef, useRef } from 'react';
import { useNumberFormatter, useSlider } from 'react-aria';
import { LabelContainer } from './LabelContainer';
import { SliderThumb } from './SliderThumb';
import { Track } from './SliderTrack';
import { SliderWrapper } from './SliderWrapper';
import { JengaSliderProps } from './types';
import { useProviderProps } from '@jenga-ui/providers';
import { useCombinedRefs } from '@jenga-ui/utils';
import { filterBaseProps } from 'tastycss';
export const RangeSlider = forwardRef((props: JengaSliderProps, ref) => {
  props = useProviderProps(props);
  let {
    length = '150px',
    defaultValue,
    labelPosition = 'top',
    formatOptions,
    minValue = 0,
    maxValue = 100,
    ...otherProps
  } = props;

  if (!defaultValue) defaultValue = [minValue, maxValue];

  let trackRef = useRef(null);
  //  trackRef= useCombinedRefs(ref);
  let numberFormatter = useNumberFormatter(props.formatOptions);
  let state = useSliderState({
    ...props,
    numberFormatter,
    minValue,
    maxValue,
    defaultValue,
  });
  let { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef,
  );

  props.mods = {
    ...props.mods,
    horizontal: state.orientation === 'horizontal',
    vertical: state.orientation === 'vertical',
    disabled: props.isDisabled,
  };
  return (
    <SliderWrapper
      {...groupProps}
      {...filterBaseProps(props)}
      mods={props.mods}
      styles={props.styles}
    >
      {props.label && (
        <LabelContainer mods={props.mods}>
          <label {...labelProps}>{props.label}</label>
          <output {...outputProps}>
            {`${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`}
          </output>
        </LabelContainer>
      )}
      <Track {...trackProps} mods={props.mods} ref={trackRef}>
        <SliderThumb index={0} state={state} trackRef={trackRef} />
        <SliderThumb index={1} state={state} trackRef={trackRef} />
      </Track>
    </SliderWrapper>
  );
});
