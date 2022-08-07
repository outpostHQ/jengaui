import { forwardRef } from 'react';
import { JengaSliderProps } from './types';
import BaseSlider from './BaseSlider';

export const RangeSlider = forwardRef((props: JengaSliderProps, ref) => {
  return <BaseSlider thumbs={2} ref={ref} {...props} />;
});
