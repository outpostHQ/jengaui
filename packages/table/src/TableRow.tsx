import { mergeProps, useFocus } from '@jenga-ui/utils';
import { useContext, useRef } from 'react';
import { useTableRow } from '@react-aria/table';
import { JengaTablePropsContext, Tr } from './TableElementsBase';
import { JengaTableElementBaseProps } from './types';

const isOnCurrentPage = (rowNumber: number, range: [number, number]) => {
  // console.log(rowNumber, range);
  return rowNumber >= range[0] && rowNumber < range[1];
};
export function TableRow(props: JengaTableElementBaseProps) {
  let { state, item, children, styles = {}, ...otherProps } = props;
  const { zebraStripes, currentlyVisibleRange = [0, 1000] } = useContext(
    JengaTablePropsContext,
  );
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
  // console.log(index);
  let { isFocused, focusProps } = useFocus({ isDisabled: false });
  return (
    <Tr
      {...otherProps}
      styles={{
        fill: isSelected
          ? '#primary.20'
          : isPressed
          ? '#primary.10'
          : index % 2
          ? zebraStripes
            ? '#primary.10'
            : 'none'
          : 'none',
        color: isSelected ? 'white' : '',
        outline: isFocused ? '2px solid #primary' : 'hidden',
        borderTop: '1px solid #E5E5FC',
        display: isOnCurrentPage(index, currentlyVisibleRange)
          ? 'table-row'
          : 'none',

        ...item.props.styles,
        ...styles,
      }}
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
    >
      {children}
    </Tr>
  );
}
