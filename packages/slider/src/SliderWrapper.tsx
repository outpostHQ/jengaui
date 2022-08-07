import { Styles, tasty } from 'tastycss';

export const StylesBasedOnLabelPos = {
  top: { flexDirection: 'column' },
  right: { flexDirection: 'row-reverse' },
  bottom: { flexDirection: 'column-reverse' },
  left: { flexDirection: 'row' },
};
const BASESTYLES: Styles = {
  display: 'flex',
};
export const SliderWrapperBase = tasty({
  styles: { ...BASESTYLES },
});
const StylesFromLength = (length, sliderOrientation) => {
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
    ref,
    ...otherProps
  } = props;
  const newStyles = {
    ...BASESTYLES,
    ...StylesBasedOnLabelPos[labelPosition],
    ...StylesFromLength(length, orientation),
    ...styles,
  };
  // console.log(labelPosition, StylesBasedOnLabelPos[labelPosition], newStyles);
  return (
    <SliderWrapperBase {...otherProps} styles={newStyles}>
      {children}
    </SliderWrapperBase>
  );
};
