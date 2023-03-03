import { forwardRef } from 'react';

import { useSlotProps } from '@jengaui/utils';
import { JengaSpaceProps, Space } from '@jengaui/layout';
import { tasty } from 'tastycss';

const ButtonGroupElement = tasty(Space, {
  qa: 'ButtonGroup',
  styles: {
    gridArea: 'buttonGroup',
  },
});

export const ButtonGroup = forwardRef(function ButtonGroup(
  props: JengaSpaceProps,
  ref,
) {
  return (
    <ButtonGroupElement ref={ref} {...useSlotProps(props, 'buttonGroup')} />
  );
});