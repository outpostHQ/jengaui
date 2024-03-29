import { forwardRef } from 'react';

import {
  BaseProps,
  CONTAINER_STYLES,
  ContainerStyleProps,
  extractStyles,
  filterBaseProps,
  tasty,
  TEXT_STYLES,
  TextStyleProps,
} from 'tastycss';
import { useSlotProps } from '@jengaui/utils';

const STYLE_LIST = [...CONTAINER_STYLES, ...TEXT_STYLES];

const HeaderElement = tasty({
  qa: 'Header',
  as: 'header',
  styles: {
    display: 'block',
    gridArea: 'header',
    flow: 'column',
  },
});

export interface JengaHeaderProps
  extends BaseProps,
    ContainerStyleProps,
    TextStyleProps {}

export const Header = forwardRef(function Header(props: JengaHeaderProps, ref) {
  props = useSlotProps(props, 'header');

  const styles = extractStyles(props, STYLE_LIST);

  return (
    <HeaderElement
      {...filterBaseProps(props, { eventProps: true })}
      ref={ref}
      styles={styles}
    />
  );
});
