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
      focused: '#purple-03.45',
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
  let { state, trackRef, index } = props;
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
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </ThumbBase>
  );
}
