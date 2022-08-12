import { useTable } from '@react-aria/table';
import { useTableState } from '@react-stately/table';
import { forwardRef, RefObject, useRef } from 'react';
import { TableBase, TableWrapper } from './TableElementsBase';
import { TableHeadSection } from './TableHeadSection';
import { TableBodySection } from './TableBodySection';
import { JengaTableProps } from './types';
import { useCombinedRefs } from '@jenga-ui/utils';
import { useProviderProps } from '@jenga-ui/core';
import { extractStyles } from 'tastycss';

export const Table = forwardRef((props: JengaTableProps, ref) => {
  const StylesFromCheckbox = (
    CheckboxPadding: 'left' | 'right',
    CheckboxPosition,
  ) => {
    if (CheckboxPosition === 'right') return { paddingLeft: CheckboxPadding };
    else return { paddingLeft: CheckboxPadding };
  };

  let {
    selectionMode = 'none',
    selectionBehavior = 'toggle',
    cellPadding = ['10px', '10px'],
    stickyHeader = false,
    zebraStripes = false,
    bodyStyles = {},
    tableStyles = {},
    headerStyles = {},
    checkboxAdditionalProps = {},
    checkboxStyles = {},
    checkboxPosition = 'left',
    ...otherProps
  } = useProviderProps(props);
  let state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === 'multiple' && selectionBehavior !== 'replace',
  });
  console.log(state);
  ref = useCombinedRefs([ref, useRef(null)]);
  let { gridProps } = useTable(props, state, ref as RefObject<HTMLElement>);

  return (
    <TableWrapper {...otherProps}>
      <TableBase
        {...gridProps}
        ref={ref}
        selectionMode={selectionMode}
        selectionBehavior={selectionBehavior}
        cellPadding={cellPadding}
        zebraStripes={zebraStripes}
        paginated={false}
        checkboxAdditionalProps={checkboxAdditionalProps}
        checkboxPosition={checkboxPosition}
        checkboxStyles={checkboxStyles}
        styles={tableStyles}
      >
        <TableHeadSection
          state={state}
          stickyHeader={stickyHeader}
          styles={headerStyles}
        />
        <TableBodySection state={state} styles={bodyStyles} />
      </TableBase>
    </TableWrapper>
  );
});
