import { useRef } from 'react';
import { useTableHeaderRow } from '@react-aria/table';

import { JengaTableElementBaseProps } from './types';
import { Tr } from './TableElementsBase';

export function TableHeaderRow(props: JengaTableElementBaseProps) {
  const { item, state, children, styles, ...otherProps } = props;
  let ref = useRef(null);
  let { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <Tr
      {...rowProps}
      {...otherProps}
      ref={ref}
      styles={{ borderTop: '0', borderBottom: '1px solid #e5e5fc', ...styles }}
    >
      {children}
    </Tr>
  );
}
