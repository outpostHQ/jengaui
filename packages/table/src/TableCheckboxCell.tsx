import { useTableSelectionCheckbox } from '@react-aria/table';
import { Checkbox } from '@jenga-ui/checkbox';
import { useTableCell } from '@react-aria/table';
import { useContext, useRef } from 'react';
import { JengaTablePropsContext, Td } from './TableElementsBase';
import { JengaTableElementBaseProps } from './types';

export function TableCheckboxCell(props: JengaTableElementBaseProps) {
  const { item: cell, state, styles, ...otherProps } = props;
  let ref = useRef(null);
  let { gridCellProps } = useTableCell({ node: cell }, state, ref);
  let { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey || 'randomKey' },
    state,
  );
  const { checkboxAdditionalProps, checkboxPosition, checkboxStyles } =
    useContext(JengaTablePropsContext);
  return (
    <Td {...gridCellProps} styles={{ ...styles }} {...otherProps} ref={ref}>
      <Checkbox
        {...checkboxProps}
        {...checkboxAdditionalProps}
        styles={checkboxStyles}
      />
    </Td>
  );
}

//remove randomKey and make it typesafe as well
