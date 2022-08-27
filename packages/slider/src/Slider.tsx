import { forwardRef } from 'react';
import BaseSlider from './BaseSlider';
import { JengaSliderProps } from './types';

export const Slider = forwardRef((props: JengaSliderProps, ref) => {
  return <BaseSlider thumbs={1} ref={ref} {...props}></BaseSlider>;
});
