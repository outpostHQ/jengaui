import { useContext, useRef } from 'react';
import { useTableCell } from '@react-aria/table';
import { mergeProps, useFocus } from '@jengaui/utils';
import { useHover } from '@react-aria/interactions';

import { JengaTablePropsContext, Td } from './TableElementsBase';
import { JengaTableElementBaseProps } from './types';

export function TableCell<T>(props: JengaTableElementBaseProps<T>) {
  const { item: cell, state, styles, ...otherProps } = props;
  let ref = useRef(null);
  let { gridCellProps } = useTableCell({ node: cell }, state, ref);
  let { isFocused, focusProps } = useFocus({ isDisabled: false });
  const { hoverProps, isHovered } = useHover({});
  const { cellProps, cellStyles } = useContext(JengaTablePropsContext);
  const { styles: cellStylesFromProps, ...otherCellProps } = cellProps;
  return (
    <Td
      ref={ref}
      {...otherProps}
      {...otherCellProps}
      {...mergeProps(gridCellProps, focusProps, hoverProps)}
      {...cell.props}
      mods={{
        focused: isFocused,
        hovered: isHovered,
        ...(cell.props?.mods || {}),
      }}
      styles={{
        outline: isFocused ? '1px solid rgba(94, 234, 212, 1)' : 'none',
        cursor: 'default',
        color: 'rgba(43, 41, 98, 1)',
        ...styles,
        ...cellStylesFromProps,
        ...cellStyles,
        ...(cell.props.styles || {}),
      }}
    >
      {cell.rendered}
    </Td>
  );
}
