import { forwardRef } from 'react';
import { DOMAttributes } from '@react-types/shared';
import { BaseProps, tasty } from 'tastycss';
import { Flex } from '@jenga-ui/layout';
import { Block } from '@jenga-ui/core';

const addPixels = (a: string, b: string) =>
  parseInt(a.replace(/px/, '')) + parseInt(b.replace(/px/, '')) + 'px';
export const TrackBase = tasty({
  styles: {
    height: {
      horizontal: '3px',
    },
    width: {
      vertical: '3px',
    },
    fill: {
      '': '#primary',
      disabled: '#light-grey.09',
    },
  },
});
const StyesFromLength = (length, sliderOrientation) => {
  console.log(length);
  return sliderOrientation === 'vertical'
    ? { height: length }
    : { width: length };
};

export const Track = forwardRef(
  (
    props: BaseProps &
      DOMAttributes & {
        sliderOrientation: 'vertical' | 'horizontal';
        sliderLength: string;
        thumbSize: string;
        fillPercentage: [number, number];
      },
    ref,
  ) => {
    const {
      sliderLength,
      thumbSize,
      fillPercentage = [0, 0],
      sliderOrientation,
      styles,
      children,
      ...otherProps
    } = props;
    return (
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        styles={{
          ...StyesFromLength(
            addPixels(sliderLength, thumbSize),
            sliderOrientation,
          ),
          ...StyesFromLength(
            thumbSize,
            sliderOrientation === 'vertical' ? 'horizontal' : 'vertical',
          ), //if thumbSize is 10px(width,height) and orientation is vertical then returns width:10px
          ...styles,
        }}
      >
        <TrackBase
          ref={ref}
          styles={{
            ...StyesFromLength(sliderLength, sliderOrientation),
            //   background: `linear-gradient(90deg, #primary ${
            //     fillPercentage[0] * 100
            //   }%,
            //      #FF0000 ${fillPercentage[1] * 100}%)`,
          }}
          {...otherProps}
        >
          {children}
        </TrackBase>
      </Flex>
    );
  },
);

const StepMark = tasty(Block, {
  styles: {
    fill: {
      '': '#primary.05',
      disabled: '#light-grey',
    },
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
});
const DescreteMarks = (step, minValue, maxValue) => {
  <Flex
    alignItems="center"
    justifyContent="space-evenly"
    styles={{ zIndex: 0 }}
  >
    {}
  </Flex>;
};
// export const TrackBase = tasty({
//   styles: {
//     '&:before': {
//       content: 'attr(x)',
//       display: 'block',
//       position: 'absolute',
//       fill: { '': '#primary', disabled: '#light-grey.60' },
//       height: {
//         horizontal: '3px',
//         vertical: '100%',
//       },
//       width: {
//         horizontal: '100%',
//         vertical: '3px',
//       },
//       top: {
//         '': 'initial',
//         horizontal: '50%',
//       },
//       left: {
//         '': 'initial',
//         vertical: '50%',
//       },
//     },
//     height: {
//       '': '20px',
//       horizontal: '30px',
//       vertical: '100%',
//     },
//     width: {
//       horizontal: '100%',
//       vertical: '30px',
//     },
//   },
// });
