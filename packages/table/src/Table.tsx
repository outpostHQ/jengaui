import { useTable } from '@react-aria/table';
import { useTableState } from '@react-stately/table';
import { useRef } from 'react';
import { TableRowGroup } from './TableRowGroup';
import { TableHeaderRow } from './TableHeaderRow';
import { TableSelectAllCell } from './TableSelectAllCells';
import { TableColumnHeader } from './TableColumnHeader';
import { TableRow } from './TableRow';
import { TableCheckboxCell } from './TableCheckboxCell';
import { TableCell } from './TableCell';
import { TableBase } from './TableElementsBase';
import { TableHeadSection } from './TableHeadSection';
import { TableBodySection } from './TableBodySection';

export function Table(props) {
  const StylesFromCheckbox = (
    CheckboxPadding: 'left' | 'right',
    CheckboxPosition,
  ) => {
    if (CheckboxPosition === 'right') return { paddingLeft: CheckboxPadding };
    else return { paddingLeft: CheckboxPadding };
  };
  let {
    checkboxPosition = 'left',
    cellPadding = '10px',
    selectionMode,
    selectionBehavior,
  } = props;
  let state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === 'multiple' && selectionBehavior !== 'replace',
  });

  let ref = useRef(null);
  let { gridProps } = useTable(props, state, ref);

  return (
    <TableBase {...gridProps} ref={ref} styles={{ borderCollapse: 'separate' }}>
      <TableHeadSection state={state} cellPadding={cellPadding} />
      <TableBodySection state={state} cellPadding={cellPadding} />
    </TableBase>
  );
}
