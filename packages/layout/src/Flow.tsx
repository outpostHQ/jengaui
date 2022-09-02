import { forwardRef } from 'react';

import {
  BaseProps,
  CONTAINER_STYLES,
  ContainerStyleProps,
  extractStyles,
  filterBaseProps,
  tasty,
} from 'tastycss';

const FlowElement = tasty({
  styles: {
    display: 'block',
    flow: 'column',
  },
});

const STYLE_PROPS = CONTAINER_STYLES;

export interface JengaFlowProps extends BaseProps, ContainerStyleProps {}

export const Flow = forwardRef(function Flow(props: JengaFlowProps, ref) {
  const styles = extractStyles(props, STYLE_PROPS);

  return (
    <FlowElement
      {...filterBaseProps(props, { eventProps: true })}
      ref={ref}
      styles={styles}
    />
  );
});