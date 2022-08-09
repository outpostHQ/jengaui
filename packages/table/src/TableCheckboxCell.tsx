import { useTableSelectionCheckbox } from '@react-aria/table';

// Reuse the Checkbox from your component library. See below for details.
import { Checkbox } from '@jenga-ui/checkbox';
import { useTableCell } from '@react-aria/table';
import { useRef } from 'react';
import { Td } from './TableElementsBase';
import { JengaTableElementBaseProps } from './types';

export function TableCheckboxCell(props: JengaTableElementBaseProps) {
  const { item: cell, state, styles, ...otherProps } = props;
  let ref = useRef(null);
  let { gridCellProps } = useTableCell({ node: cell }, state, ref);
  let { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey || 'randomKey' },
    state,
  );

  return (
    <Td {...gridCellProps} styles={{ ...styles }} {...otherProps} ref={ref}>
      <Checkbox {...checkboxProps} />
    </Td>
  );
}

//remove randomKey and make it typesafe as well
