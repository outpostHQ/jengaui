import { forwardRef, useRef } from 'react';
import {
  mergeProps,
  SliderThumbAria,
  useSliderThumb,
  VisuallyHidden,
} from 'react-aria';
import { useCombinedRefs, useFocus } from '@jenga-ui/utils';
import { tasty } from 'tastycss';
import { JengaSliderThumbProps } from './types';
import { useProviderProps } from '@jenga-ui/providers';

const ThumbBase = tasty({
  styles: {
    display: 'grid',
    placeItems: 'center',
    fill: {
      '': '#primary',
      dragging: '#purple.9',
      disabled: '#BCBCBC',
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
export const SliderThumb = forwardRef((props: JengaSliderThumbProps, ref) => {
  props = useProviderProps(props);
  let { state, trackRef, index, icon, thumbSize = '20px' } = props;
  let inputRef = useCombinedRefs(ref);
  let { thumbProps, inputProps, isDragging, isDisabled } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    state,
  );

  let { focusProps, isFocused } = useFocus({ isDisabled: isDisabled }, true);
  console.log(isDisabled);
  return (
    <ThumbBase
      {...thumbProps}
      mods={{
        horizontal: state.orientation === 'horizontal',
        vertical: state.orientation === 'vertical',
        disabled: isDisabled,
        focused: isFocused,
        dragging: isDragging,
      }}
      styles={{ height: thumbSize, width: thumbSize }}
    >
      {icon}
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </ThumbBase>
  );
});
