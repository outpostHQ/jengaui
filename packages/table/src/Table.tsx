import { useTable } from '@react-aria/table';
import { useTableState } from '@react-stately/table';
import { forwardRef, RefObject, useRef } from 'react';
import { TableBase, TableWrapper } from './TableElementsBase';
import { TableHeadSection } from './TableHeadSection';
import { TableBodySection } from './TableBodySection';
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
    selectionMode = 'none',
    selectionBehavior = 'toggle',
    cellPadding = ['10px', '0'],
    stickyHeader = false,
    zebraStripes = false,
    tableStyles = {},
    bodyStyles = {},
    headerStyles = {},
    checkboxAdditionalProps = {},
    checkboxStyles = {},
    checkboxPosition = 'left',
    ...otherProps
  } = props;
  console.log(zebraStripes);
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
        cellPadding={cellPadding}
        zebraStripes={zebraStripes}
        paginated={false}
        styles={tableStyles}
        checkboxAdditionalProps={checkboxAdditionalProps}
        checkboxPosition={checkboxPosition}
        checkboxStyles={checkboxStyles}
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
