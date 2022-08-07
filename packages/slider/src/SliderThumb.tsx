import { useRef } from 'react';
import { mergeProps, useSliderThumb, VisuallyHidden } from 'react-aria';
import { useFocus } from '@jenga-ui/utils';
import { tasty } from 'tastycss';

const ThumbBase = tasty({
  styles: {
    fill: {
      '': '#primary',
      dragging: '#purple.9',
      disabled: '#light-grey.60',
    },
    outline: {
      '': 'none',
      focused: '5px #purple-03.45',
    },
    borderRadius: '50%',
    top: {
      horizontal: '50%',
    },
    left: {
      vertical: '50%',
    },
    width: '20px',
    height: '20px',
  },
});
export function SliderThumb(props) {
  let { state, trackRef, index, thumbSize = '20px' } = props;
  let inputRef = useRef<HTMLInputElement>(null);
  let { thumbProps, inputProps, isDragging, isDisabled } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    state,
  );

  let { focusProps, isFocused } = useFocus({ isDisabled: isDisabled }, true);
  console.log(thumbSize);
  return (
    <ThumbBase
      {...thumbProps}
      mods={{
        horizontal: state.orientation === 'horizontal',
        vertical: state.orientation === 'vertical',
        disabled: props.isDisabled,
        focused: isFocused,
        dragging: isDragging,
      }}
      styles={{ height: thumbSize, width: thumbSize }}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </ThumbBase>
  );
}
