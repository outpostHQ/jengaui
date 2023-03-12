import { useTableSelectionCheckbox } from '@react-aria/table';
import { Checkbox } from '@jengaui/checkbox';
import { useTableCell } from '@react-aria/table';
import { useContext, useRef } from 'react';

import { JengaTablePropsContext, Td } from './TableElementsBase';
import { JengaTableCheckboxCellProps } from './types';

export function TableCheckboxCell<T>(props: JengaTableCheckboxCellProps<T>) {
  const { item: cell, state, ...otherProps } = props;
  let ref = useRef(null);
  let { gridCellProps } = useTableCell({ node: cell }, state, ref);
  let { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey || 'randomKey' },
    state,
  );
  const { checkboxProps: jengCheckboxProps, checkboxStyles } = useContext(
    JengaTablePropsContext,
  );
  const { styles: checkboxStylesFromProps, ...otherCheckboxProps } =
    jengCheckboxProps;
  return (
    <Td {...cell.props} {...gridCellProps} {...otherProps} ref={ref}>
      <Checkbox
        {...checkboxProps}
        styles={{ ...checkboxStylesFromProps, ...checkboxStyles }}
        {...otherCheckboxProps}
      />
    </Td>
  );
}

//remove randomKey and make it typesafe as well
