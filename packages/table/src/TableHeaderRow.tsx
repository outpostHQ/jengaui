import { HTMLProps, useRef } from 'react';
import { useTableHeaderRow } from '@react-aria/table';

import { JengaTableElementBaseProps } from './types';
import { Tr } from './TableElementsBase';

export function TableHeaderRow<T>(
  props: JengaTableElementBaseProps<T> & HTMLProps<HTMLTableRowElement>,
) {
  const { item, state, children, styles, ...otherProps } = props;
  let ref = useRef(null);
  let { rowProps } = useTableHeaderRow({ node: item }, state, ref);
  return (
    <Tr
      {...rowProps}
      {...otherProps}
      ref={ref}
      role={'HeaderRow'}
      styles={{ borderTop: '0', borderBottom: '1px solid #e5e5fc', ...styles }}
    >
      {children}
    </Tr>
  );
}
