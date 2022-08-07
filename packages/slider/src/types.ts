import { AriaSliderProps } from 'react-aria';
import { NumberFormatOptions } from '@internationalized/number';
import { BasePropsWithoutChildren } from 'tastycss';
import { SliderState } from '@react-stately/slider';
import { MutableRefObject, ReactNode, Ref } from 'react';
export interface JengaBaseSliderProps
  extends AriaSliderProps,
    BasePropsWithoutChildren {
  isDisabled?: boolean;
  thumbs?: 1 | 2;
  sliderLength?: string | string[];
  formatOptions?: NumberFormatOptions;
  labelPosition?: 'top' | 'right' | 'bottom' | 'left';
  thumbSize?: 'small' | 'medium' | 'large' | string;
  thumbIcon?: ReactNode;
}
export type JengaSliderProps = Omit<JengaBaseSliderProps, 'thumbs'>;
export type JengaSliderThumbProps = {
  index: number;
  state: SliderState;
  trackRef: MutableRefObject<Element>;
  thumbSize: string;
  icon?: ReactNode;
};
