import { mergeProps, useFocus } from '@jengaui/utils';
import { useHover } from '@react-aria/interactions';
import { HTMLProps, useContext, useRef } from 'react';
import { useTableRow } from '@react-aria/table';

import { JengaTablePropsContext, Tr } from './TableElementsBase';
import { JengaTableElementBaseProps } from './types';

export function TableRow<T>(
  props: JengaTableElementBaseProps<T> & HTMLProps<HTMLTableRowElement>,
) {
  let {
    state,
    item,
    children,
    styles = {},
    isDisabled,
    isHidden,
    ...otherProps
  } = props;
  const {
    zebraStripes,
    rowProps: jengaRowProps,
    rowStyles,
  } = useContext(JengaTablePropsContext);
  let ref = useRef(null);
  let isSelected = state.selectionManager.isSelected(item.key);
  let { rowProps, isPressed } = useTableRow(
    {
      node: item,
    },
    state,
    ref,
  );
  const index = item.index ? item.index : 0;

  let { isFocused, focusProps } = useFocus({ isDisabled });
  let { hoverProps, isHovered } = useHover({ isDisabled });
  const { styles: rowStylesFromProps, ...otherRowProps } = jengaRowProps;
  return (
    <Tr
      {...otherRowProps}
      {...otherProps}
      {...item.props}
      mods={{
        selected: isSelected,
        pressed: isPressed,
        zebraStripes: zebraStripes,
        focused: isFocused,
        hidden: isHidden,
        hovered: isHovered,
        ...(item.props?.mods || {}),
      }}
      {...mergeProps(rowProps, focusProps, hoverProps)}
      ref={ref}
      styles={{
        fill: {
          '': 'none',
          selected: '#primary.20',
          pressed: '#primary.10',
          zebraStripes: index % 2 ? '#primary.10' : 'none',
        },
        color: { selected: 'white' },
        outline: { '': 'none', focused: '1px rgba(94, 234, 212, 1)' },
        ...styles,
        ...rowStylesFromProps,
        ...rowStyles,
        ...(item.props.styles || {}),
      }}
    >
      {children}
    </Tr>
  );
}
