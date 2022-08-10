import { mergeProps, useFocus } from '@jenga-ui/utils';
import { useRef } from 'react';
import { useTableRow } from '@react-aria/table';
import { Tr } from './TableElementsBase';
import { JengaTableElementBaseProps } from './types';

export function TableRow(props: JengaTableElementBaseProps) {
  let { state, item, children, styles = {}, ...otherProps } = props;
  let ref = useRef(null);
  console.log(item.key);
  let isSelected = state.selectionManager.isSelected(item.key);
  let { rowProps, isPressed } = useTableRow(
    {
      node: item,
    },
    state,
    ref,
  );
  const index = item.index ? item.index : 0;
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
          ? 'none'
          : 'none',
        color: isSelected ? 'white' : '',
        outline: isFocused ? '2px solid #primary' : 'none',
        borderTop: '1px solid #E5E5FC',
        ...styles,
      }}
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
    >
      {children}
    </Tr>
  );
}
