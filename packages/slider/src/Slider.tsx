import { useSliderState } from '@react-stately/slider';
import { useRef } from 'react';
import { mergeProps } from '@react-aria/utils';
import { useSlider, useSliderThumb } from '@react-aria/slider';
import { useFocusRing } from '@react-aria/focus';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useNumberFormatter } from '@react-aria/i18n';
import './sliderstyles.css';
import { tasty } from 'tastycss';
export function Slider(props) {
  let length = '150px';
  if (props.length) length = props.length;
  let trackRef = useRef(null);
  let numberFormatter = useNumberFormatter(props.formatOptions);
  let state = useSliderState({ ...props, numberFormatter });
  let { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef,
  );

  const SliderWrapper = tasty({
    styles: {
      height: {
        '': 'initial',
        vertical: length,
      },
      width: {
        '': 'initial',
        horizontal: length,
      },
      fill: {
        '': '#purple-02.45',
        disabled: '#light-grey.200',
      },
    },
    className: `slider ${state.orientation}`,
  });

  return (
    <SliderWrapper>
      {/* Create a container for the label and output element. */}
      {props.label && (
        <div className="label-container">
          <label {...labelProps}>{props.label}</label>
          <output {...outputProps}>{state.getThumbValueLabel(0)}</output>
        </div>
      )}
      {/* The track element holds the visible track line and the thumb. */}
      <div
        {...trackProps}
        ref={trackRef}
        className={`track ${state.isDisabled ? 'disabled' : ''}`}
      >
        <Thumb index={0} state={state} trackRef={trackRef} />
      </div>
    </SliderWrapper>
  );
}
const SliderBar = tasty({});
const ThumbBase = tasty({
  styles: {
    fill: '#purple-03.6',
    outline: {
      '': '#purple',
      focused: '#purple-03.45',
    },
  },
});
function Thumb(props) {
  let { state, trackRef, index } = props;
  let inputRef = useRef(null);
  let { thumbProps, inputProps, isDragging } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    state,
  );

  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <div
      {...thumbProps}
      className={`thumb ${isFocusVisible ? 'focus' : ''} ${
        isDragging ? 'dragging' : ''
      }`}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </div>
  );
}
