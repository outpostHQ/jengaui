import { forwardRef } from 'react';
import { mergeProps, useSliderThumb, VisuallyHidden } from 'react-aria';
import { useCombinedRefs, useFocus } from '@jenga-ui/utils';
import { tasty } from 'tastycss';
import { JengaSliderThumbProps } from './types';
import { useProviderProps } from '@jenga-ui/providers';
// import { Tooltip, TooltipProvider } from '@jenga-ui/tooltip';

const ThumbBase = tasty({
  display: 'grid',
  placeItems: 'center',
  styles: {
    fill: {
      '': '#primary',
      dragging: '#purple.9',
      disabled: '#BCBCBC',
      danger: '#danger',
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

const themedBorders = {
  default: {
    border: '5px solid rgba(190, 178, 255, 0.3)',
    boxShadow: '2px 2px 8px 0.5px rgba(91, 90, 129, 0.2)',
  },
  danger: {
    border: '5px solid rgba(200, 10, 10, 0.3)',
    boxShadow: '2px 2px 8px 0.5px rgba(91, 90, 129, 0.2)',
  },
};
export const SliderThumb = forwardRef((props: JengaSliderThumbProps, ref) => {
  props = useProviderProps(props);
  let {
    state,
    trackRef,
    index,
    icon,
    thumbSize = '20px',
    theme = 'default',
  } = props;
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
    // <TooltipProvider
    //   placement={state.orientation === 'vertical' ? 'left' : 'bottom'}
    // >
    <ThumbBase
      {...thumbProps}
      mods={{
        horizontal: state.orientation === 'horizontal',
        vertical: state.orientation === 'vertical',
        disabled: isDisabled,
        focused: isFocused,
        dragging: isDragging,
        default: theme === 'default',
        danger: theme === 'danger',
      }}
      styles={{
        height: thumbSize,
        width: thumbSize,
        ...(isFocused ? themedBorders[theme] : {}),
      }}
    >
      {/* <Tooltip
          color={'black'}
          fill={'white'}
          border={'2px solid black'}
          mods={{
            horizontal: state.orientation === 'horizontal',
            vertical: state.orientation === 'vertical',
          }}
          styles={{
            position: 'absolute',
            left: `${state.getPercentValue(index) * 100}%`,
            transform: `translate(-50%, -50%)`,
            touchAction: `none`,
          }}
        >
          {state.getThumbValue(index)}
        </Tooltip> */}
      {icon}
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </ThumbBase>
    // </TooltipProvider>
  );
});
