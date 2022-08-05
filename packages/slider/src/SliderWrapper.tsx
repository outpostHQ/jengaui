import { ReactNode } from 'react';
import { Styles, tasty } from 'tastycss';
import { JengaSliderProps } from './types';

export const StylesBasedOnLabelPos = {
  top: { flexDirection: 'column' },
  right: { flexDirection: 'row' },
  bottom: { flexDirection: 'column-reverse' },
  left: { flexDirection: 'row-reverse' },
};
const BASESTYLES: Styles = {
  display: 'flex',
  height: {
    vertical: '150px',
  },
  width: {
    horizontal: '300px',
  },
};
export const SliderWrapperBase = tasty({
  styles: { ...BASESTYLES },
});
const StyleFromLength = (length, sliderOrientation) => {
  return sliderOrientation === 'vertical'
    ? { height: length }
    : { width: length };
};
export const SliderWrapper = (props) => {
  const {
    labelPosition,
    length,
    orientation = 'top',
    styles,
    children,
    ...otherProps
  } = props;
  const newStyles = {
    ...BASESTYLES,
    ...StylesBasedOnLabelPos[labelPosition],
    ...StyleFromLength(length, orientation),
    ...styles,
  };
  return (
    <SliderWrapperBase {...otherProps} styles={newStyles}>
      {children}
    </SliderWrapperBase>
  );
};
