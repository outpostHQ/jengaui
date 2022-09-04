import { useRef } from 'react';
import { useTableCell } from '@react-aria/table';
import { mergeProps, useFocus } from '@jenga-ui/utils';

import { Td } from './TableElementsBase';
import { JengaTableElementBaseProps } from './types';

export function TableCell(props: JengaTableElementBaseProps) {
  const { item: cell, state, styles, ...otherProps } = props;
  let ref = useRef(null);
  let { gridCellProps } = useTableCell({ node: cell }, state, ref);
  let { isFocused, focusProps } = useFocus({ isDisabled: false });
  return (
    <Td
      {...otherProps}
      {...mergeProps(gridCellProps, focusProps)}
      ref={ref}
      styles={{
        outline: isFocused ? '1px solid rgba(94, 234, 212, 1)' : 'none',
        cursor: 'default',
        color: 'rgba(43, 41, 98, 1)',
        ...styles,
        ...cell.props.styles,
      }}
    >
      {cell.rendered}
    </Td>
  );
}
