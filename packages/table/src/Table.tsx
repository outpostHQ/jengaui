import { useTable } from '@react-aria/table';
import { useTableState } from '@react-stately/table';
import { useRef } from 'react';
import { TableBase, TableWrapper } from './TableElementsBase';
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
    // defaultSelectedKeys,
    // disallowEmptySelection,
    ...otherProps
  } = props;
  let state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === 'multiple' && selectionBehavior !== 'replace',
  });
  console.log(state.selectionManager.selectedKeys);

  let ref = useRef(null);
  let { gridProps } = useTable(props, state, ref);

  return (
    <TableWrapper>
      <TableBase
        {...gridProps}
        ref={ref}
        styles={{ borderCollapse: 'collapse', width: '100%' }}
        selectionMode={selectionMode}
        selectionBehavior={selectionBehavior}
        {...otherProps}
      >
        <TableHeadSection state={state} cellPadding={cellPadding} />
        <TableBodySection state={state} cellPadding={cellPadding} />
      </TableBase>
    </TableWrapper>
  );
}
