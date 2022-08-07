import { useSliderState } from '@react-stately/slider';
import { forwardRef, useRef } from 'react';
import { useSlider } from '@react-aria/slider';
import { useNumberFormatter } from '@react-aria/i18n';
import { Track } from './SliderTrack';
import { SliderThumb } from './SliderThumb';
import { LabelContainer } from './LabelContainer';
import { SliderWrapper } from './SliderWrapper';
import { JengaBaseSliderProps } from './types';
import { filterBaseProps } from 'tastycss';

const BaseSlider = forwardRef((props: JengaBaseSliderProps, ref) => {
  let {
    sliderLength = '150px',
    thumbSize = 'small',
    labelPosition = 'top',
    formatOptions,
    thumbs = 1,
    minValue = 0,
    maxValue = 100,
    defaultValue,
    ...otherProps
  } = props;

  const thumbSizeCatalog = {
    small: '12px',
    medium: '20px',
    large: '40px',
  };

  let newThumbSize = thumbSizeCatalog.hasOwnProperty(thumbSize)
    ? thumbSizeCatalog[thumbSize]
    : thumbSize;

  if (!defaultValue)
    defaultValue = thumbs === 2 ? [minValue, maxValue] : minValue;
  let trackRef = useRef(null);

  // ref = useCombinedRefs(trackRef, ref);
  let numberFormatter = useNumberFormatter(formatOptions);

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

  let mods = {
    horizontal: state.orientation === 'horizontal',
    vertical: state.orientation === 'vertical',
    disabled: props.isDisabled,
  };

  return (
    <SliderWrapper
      {...groupProps}
      {...filterBaseProps(props)}
      mods={mods}
      styles={props.styles}
      labelPosition={labelPosition}
    >
      {props.label && (
        <LabelContainer
          mods={mods}
          // styles={{
          //   paddingInline: parseInt(newThumbSize.replace(/px/, '')) / 2 + 'px',
          // }}
        >
          <label {...labelProps}>{props.label}</label>
          {/* <output {...outputProps}>
            {thumbs === 1
              ? state.getThumbValueLabel(0)
              : `${state.getThumbValueLabel(0)}-${state.getThumbValueLabel(1)}`}
          </output> */}
        </LabelContainer>
      )}
      <Track
        {...trackProps}
        mods={mods}
        ref={trackRef}
        sliderOrientation={state.orientation}
        sliderLength={sliderLength}
        thumbSize={newThumbSize}
        fillPercentage={
          thumbs === 2
            ? [0, state.getThumbPercent(0)]
            : [state.getThumbPercent(0), state.getThumbPercent(1)]
        }
      >
        <SliderThumb
          index={0}
          state={state}
          trackRef={trackRef}
          thumbSize={newThumbSize}
        />
        {thumbs === 2 ? (
          <SliderThumb
            index={1}
            state={state}
            trackRef={trackRef}
            thumbSize={newThumbSize}
          />
        ) : null}
      </Track>
    </SliderWrapper>
  );
});
export default BaseSlider;
