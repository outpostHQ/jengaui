import { useTable } from '@react-aria/table';
import { useTableState } from '@react-stately/table';
import { forwardRef, RefObject, useRef } from 'react';
import { TableBase, TableWrapper } from './TableElementsBase';
import { TableHeadSection } from './TableHeadSection';
import { TableBodySection } from './TableBodySection';
import { BaseProps } from 'tastycss';
import { JengaTableProps } from './types';
import { useCombinedRefs } from '@jenga-ui/utils';

export const Table = forwardRef((props: JengaTableProps, ref) => {
  const StylesFromCheckbox = (
    CheckboxPadding: 'left' | 'right',
    CheckboxPosition,
  ) => {
    if (CheckboxPosition === 'right') return { paddingLeft: CheckboxPadding };
    else return { paddingLeft: CheckboxPadding };
  };
  let {
    checkboxPosition = 'left',
    selectionMode = 'none',
    selectionBehavior = 'toggle',
    cellPadding = '10px',
    stickyHeader = false,
    ...otherProps
  } = props;
  let state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === 'multiple' && selectionBehavior !== 'replace',
  });
  // console.log(state.selectionManager.selectedKeys);
  ref = useCombinedRefs([ref, useRef(null)]);
  let { gridProps } = useTable(props, state, ref as RefObject<HTMLElement>);

  return (
    <TableWrapper {...otherProps}>
      <TableBase
        {...gridProps}
        ref={ref}
        selectionMode={selectionMode}
        selectionBehavior={selectionBehavior}
      >
        <TableHeadSection
          state={state}
          stickyHeader={stickyHeader}
          cellPadding={cellPadding}
        />
        <TableBodySection state={state} cellPadding={cellPadding} />
      </TableBase>
    </TableWrapper>
  );
});
