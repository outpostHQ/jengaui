import { AriaSliderProps } from 'react-aria';
import { NumberFormatOptions } from '@internationalized/number';
import { BasePropsWithoutChildren } from 'tastycss';
export interface JengaSliderProps
  extends AriaSliderProps,
    BasePropsWithoutChildren {
  length?: string;
  formatOptions?: NumberFormatOptions;
  labelPosition?: 'top' | 'right' | 'bottom' | 'left';
}
