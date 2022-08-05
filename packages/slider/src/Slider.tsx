import { useSliderState } from '@react-stately/slider';
import { forwardRef, useRef } from 'react';
import { useSlider } from '@react-aria/slider';
import { useNumberFormatter } from '@react-aria/i18n';
import { Track } from './SliderTrack';
import { SliderThumb } from './SliderThumb';
import { LabelContainer } from './LabelContainer';
import { SliderWrapper } from './SliderWrapper';
import { JengaSliderProps } from './types';
import { useProviderProps } from '@jenga-ui/providers';
import { filterBaseProps } from 'tastycss';
import { useCombinedRefs } from '@jenga-ui/utils';

export const Slider = forwardRef((props: JengaSliderProps, ref) => {
  props = useProviderProps(props);
  let {
    length = '150px',
    labelPosition = 'top',
    formatOptions,
    minValue = 0,
    maxValue = 100,
    defaultValue,
    ...otherProps
  } = props;
  if (!defaultValue) defaultValue = minValue;
  let trackRef = useRef(null);
  // ref = useCombinedRefs(trackRef, ref);
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
      labelPosition={labelPosition}
    >
      {props.label && (
        <LabelContainer mods={props.mods}>
          <label {...labelProps}>{props.label}</label>
          <output {...outputProps}>{state.getThumbValueLabel(0)}</output>
        </LabelContainer>
      )}
      <Track
        {...trackProps}
        mods={props.mods}
        ref={trackRef}
        sliderOrientation={state.orientation}
        length={length}
      >
        <SliderThumb index={0} state={state} trackRef={trackRef} />
      </Track>
    </SliderWrapper>
  );
});
