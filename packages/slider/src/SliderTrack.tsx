import { forwardRef } from 'react';
import { DOMAttributes } from '@react-types/shared';
import { BaseProps, tasty } from 'tastycss';
import { Flex } from '@jenga-ui/layout';
import { Block, useProviderProps } from '@jenga-ui/core';

const addPixels = (a: string, b: string) =>
  parseInt(a.replace(/px/, '')) + parseInt(b.replace(/px/, '')) + 'px';

export const TrackBase = tasty({
  styles: {
    height: {
      horizontal: '4px',
    },
    width: {
      vertical: '4px',
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
        minValue?: number;
        maxValue?: number;
        step?: number;
        sliderOrientation?: 'vertical' | 'horizontal';
        sliderLength: string | string[];
        thumbSize?: string;
        fillPercentage?: [number, number];
        discrete?: boolean;
      },
    ref,
  ) => {
    props = useProviderProps(props);
    const {
      minValue = 0,
      maxValue = 100,
      step = 1,
      sliderLength,
      thumbSize,
      fillPercentage = [0, 0],
      sliderOrientation,
      styles,
      theme = 'default',
      mods,
      children,
      discrete = false,
      ...otherProps
    } = props;
    console.log(theme);
    const getContainerLength = (sliderLength, thumbSize) => {
      if (Array.isArray(sliderLength)) {
        return sliderLength.map((len) => addPixels(len, thumbSize));
      } else return addPixels(sliderLength, thumbSize);
    };

    return (
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        styles={{
          ...StyesFromLength(
            getContainerLength(sliderLength, thumbSize),
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
          mods={{
            ...mods,
            default: theme === 'default',
            danger: theme === 'danger',
          }}
          styles={{
            ...StyesFromLength(sliderLength, sliderOrientation),
            // backgroundImage: `linear-gradient(90deg, #primary ${
            //   fillPercentage[0] * 100
            // }%,
            //      #FF0000 ${fillPercentage[1] * 100}%)`,

            backgroundImage: {
              '': `linear-gradient(
              to ${sliderOrientation === 'vertical' ? 'top' : 'right'},
              rgba(var(--purple-color-rgb), 0.5) 0%,
              rgba(var(--purple-color-rgb), 0.5) ${fillPercentage[0] * 100}%,
              rgba(var(--purple-color-rgb), 1) ${fillPercentage[0] * 100}%,
              rgba(var(--purple-color-rgb), 1) ${fillPercentage[1] * 100}%,
              rgba(var(--purple-color-rgb), 0.5) ${fillPercentage[1] * 100}%,
              rgba(var(--purple-color-rgb), 0.5) 100%)`,
              default: `linear-gradient(
                to ${sliderOrientation === 'vertical' ? 'top' : 'right'},
                rgba(var(--purple-color-rgb), 0.5) 0%,
                rgba(var(--purple-color-rgb), 0.5) ${fillPercentage[0] * 100}%,
                rgba(var(--purple-color-rgb), 1) ${fillPercentage[0] * 100}%,
                rgba(var(--purple-color-rgb), 1) ${fillPercentage[1] * 100}%,
                rgba(var(--purple-color-rgb), 0.5) ${fillPercentage[1] * 100}%,
                rgba(var(--purple-color-rgb), 0.5) 100%)`,
              danger:
                'linear-gradient(90deg, rgba(var(--danger-color-rgb), 0.5), rgba(var(--danger-color-rgb),1) )',
            },
          }}
          {...otherProps}
        >
          {discrete ? (
            <DescreteMarks
              minValue={minValue}
              maxValue={maxValue}
              step={step}
              mods={{
                ...mods,
                default: theme === 'default',
                danger: theme === 'danger',
              }}
            />
          ) : null}
          {children}
        </TrackBase>
      </Flex>
    );
  },
);

const StepMark = tasty(Block, {
  styles: {
    fill: {
      '': '#121212',
      disabled: '#BCBCBC',
    },
    width: '4px',
    height: '4px',
    borderRadius: '50%',
  },
});
const DescreteMarks = (props) => {
  let { step, minValue, maxValue, mods } = props;
  const n = (maxValue - minValue) * step;
  console.log(n);
  return (
    <Flex
      alignItems="center"
      justifyContent="space-evenly"
      styles={{
        zIndex: 0,
        flexDirection: {
          horizontal: 'row',
          vertical: 'column',
        },
        width: {
          horizontal: '100%',
        },
        height: {
          vertical: '100%',
        },
      }}
      mods={mods}
    >
      {[...Array(n - 1)].map((e, i) => (
        <StepMark key={i} />
      ))}
    </Flex>
  );
};
