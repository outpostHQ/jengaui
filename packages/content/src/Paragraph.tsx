import { forwardRef } from 'react';

import {
  CONTAINER_STYLES,
  ContainerStyleProps,
  extractStyles,
  Styles,
  TEXT_STYLES,
} from 'tastycss';

import { JengaTextProps, Text } from './Text';

const DEFAULT_STYLES: Styles = {
  preset: 'p3',
  color: '#dark.75',
  display: 'block',
};

const STYLE_PROPS = [...CONTAINER_STYLES, ...TEXT_STYLES];

export interface JengaParagraphProps
  extends JengaTextProps,
    ContainerStyleProps {}

export const Paragraph = forwardRef(function Paragraph(
  props: JengaParagraphProps,
  ref,
) {
  const styles = extractStyles(props, STYLE_PROPS, DEFAULT_STYLES);

  return <Text as="p" qa="Paragraph" {...props} ref={ref} styles={styles} />;
});
