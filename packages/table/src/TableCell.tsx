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
      styles={{
        outline: isFocused ? '2px solid orange' : 'none',
        cursor: 'default',
        color: 'rgba(43, 41, 98, 1)',
        ...styles,
      }}
      ref={ref}
    >
      {cell.rendered}
    </Td>
  );
}
