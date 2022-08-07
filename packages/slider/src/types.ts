import { AriaSliderProps } from 'react-aria';
import { NumberFormatOptions } from '@internationalized/number';
import { BasePropsWithoutChildren } from 'tastycss';
export interface JengaBaseSliderProps
  extends AriaSliderProps,
    BasePropsWithoutChildren {
  thumbs?: 1 | 2;
  sliderLength?: string;
  formatOptions?: NumberFormatOptions;
  labelPosition?: 'top' | 'right' | 'bottom' | 'left';
  thumbSize?: 'small' | 'medium' | 'large' | string;
}
export type JengaSliderProps = Omit<JengaBaseSliderProps, 'thumbs'>;
