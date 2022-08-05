import { forwardRef, ReactNode } from 'react';
import { DOMAttributes } from '@react-types/shared';
import { AriaSliderProps } from 'react-aria';
import { BaseProps, tasty } from 'tastycss';
import { JengaSliderProps } from './types';

export const TrackBase = tasty({
  styles: {
    '&:before': {
      content: 'attr(x)',
      display: 'block',
      position: 'absolute',
      fill: { '': '#primary', disabled: '#light-grey.60' },
      height: {
        horizontal: '3px',
        vertical: '100%',
      },
      width: {
        horizontal: '100%',
        vertical: '3px',
      },
      top: {
        '': 'initial',
        horizontal: '50%',
      },
      left: {
        '': 'initial',
        vertical: '50%',
      },
    },
    height: {
      '': '20px',
      horizontal: '30px',
      vertical: '100%',
    },
    width: {
      horizontal: '100%',
      vertical: '30px',
    },
  },
});
const StyesFromLength = (length, sliderOrientation) => {
  return sliderOrientation === 'vertical'
    ? { height: length }
    : { width: length };
};
export const Track = forwardRef(
  (
    props: BaseProps &
      DOMAttributes & {
        sliderOrientation: 'vertical' | 'horizontal';
        length: string;
      },
    ref,
  ) => {
    const { length, sliderOrientation, styles, children, ...otherProps } =
      props;
    return (
      <TrackBase
        ref={ref}
        styles={{ ...StyesFromLength(length, sliderOrientation), ...styles }}
        {...otherProps}
      >
        {children}
      </TrackBase>
    );
  },
);
