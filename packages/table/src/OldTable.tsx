import { useTable } from '@react-aria/table';
import { useTableState } from '@react-stately/table';
import { forwardRef, RefObject, useRef } from 'react';
import { TableBase, TableWrapper, Td, Tr } from './TableElementsBase';
import { TableHeadSection } from './TableHeadSection';
import { TableBodySection } from './TableBodySection';
import { JengaTableProps } from './types';
import { useCombinedRefs } from '@jenga-ui/utils';
import { useProviderProps } from '@jenga-ui/core';
import { filterBaseProps } from 'tastycss';
import { TableRowGroup } from './TableRowGroup';

const DefaultTableProps = {
  withFooter: true,
  selectionMode: 'none',
  selectionBehavior: 'toggle',
  stickyHeader: false,
  zebraStripes: false,
  checkboxAdditionalProps: {},
  checkboxStyles: {},
  IsEmpty: <></>,
};

const withDefaultTableProps = (props) => {
  for (let key of Object.keys(DefaultTableProps)) {
    if (!props.hasOwnProperty(key)) {
      props[key] = DefaultTableProps[key];
    }
  }
  return props;
};

export const Table = forwardRef((props: JengaTableProps, ref) => {
  props = withDefaultTableProps(useProviderProps(props));
  let {
    headerStyles = {},
    tableStyles = {},
    bodyStyles = {},
    footerStyles = {},
    ...otherProps
  } = props;
  const wrapperProps = filterBaseProps(props);
  let state = useTableState({
    ...props,
    showSelectionCheckboxes:
      props.selectionMode === 'multiple' &&
      props.selectionBehavior !== 'replace',
  });
  ref = useCombinedRefs([ref, useRef(null)]);
  let { gridProps } = useTable(props, state, ref as RefObject<HTMLElement>);

  return (
    <TableWrapper {...wrapperProps}>
      <TableBase
        {...gridProps}
        ref={ref}
        {...otherProps}
        styles={tableStyles}
        paginated={false}
      >
        <TableHeadSection
          state={state}
          stickyHeader={props.stickyHeader}
          styles={headerStyles}
        />
        <TableBodySection
          state={state}
          styles={bodyStyles}
          IsEmpty={props.IsEmpty}
        />
        {state.collection.rows.length - 1 !== 0 ? (
          <TableRowGroup
            as={'tfoot'}
            styles={{ height: '40px', fill: '#f9f9fe', ...footerStyles }}
          >
            <Tr>
              <Td
                colSpan={'100%'}
                styles={{ textAlign: 'center', fontWeight: 400 }}
              >
                Showing {state.collection.rows.length - 1} of
                {state.collection.rows.length - 1} results.
              </Td>
            </Tr>
          </TableRowGroup>
        ) : (
          <></>
        )}
      </TableBase>
    </TableWrapper>
  );
});
