import { useTable } from '@react-aria/table';
import { useTableState } from '@react-stately/table';
import { forwardRef, RefObject, useRef, useState } from 'react';
import { useCombinedRefs } from '@jengaui/utils';
import { useProviderProps } from '@jengaui/providers';
import { BaseProps, filterBaseProps } from 'tastycss';

import { TableBase, TableWrapper, Td, Tr } from './TableElementsBase';
import { TableHeadSection } from './TableHeadSection';
import { TableBodySection } from './TableBodySection';
import { JengaTableProps } from './types';
import { TableRowGroup } from './TableRowGroup';
import { TablePaginationHeader } from './TablePaginationHeader';

const calcTotalPages = (bodyRows: number, recordsPerPage: number) => {
  let totalPages = parseInt((bodyRows / recordsPerPage).toFixed(0));
  totalPages += bodyRows % recordsPerPage === 0 ? 0 : 1;
  return totalPages;
};
const DefaultTableProps = {
  showFooter: true,
  selectionMode: 'none',
  selectionBehavior: 'toggle',
  stickyHeader: false,
  zebraStripes: false,
  checkboxAdditionalProps: {},
  checkboxStyles: {},
  IsEmpty: <></>,
  paginated: false,
};

const withDefaultTableProps = (props: JengaTableProps) => {
  for (let key of Object.keys(DefaultTableProps)) {
    if (!props.hasOwnProperty(key)) {
      props[key] = DefaultTableProps[key];
    }
  }
  return props;
};

export const Table = forwardRef(function _Table(props: JengaTableProps, ref) {
  props = withDefaultTableProps(useProviderProps(props));
  let {
    headerStyles = {},
    tableStyles = {},
    bodyStyles = {},
    footerStyles = {},
    ...otherProps
  } = props;

  const wrapperProps = filterBaseProps(props, {
    propNames: new Set(['styles', 'style']),
  }); //include more props
  let state = useTableState({
    ...props,
    showSelectionCheckboxes:
      props.selectionMode === 'multiple' &&
      props.selectionBehavior !== 'replace',
  });

  ref = useCombinedRefs([ref, useRef(null)]);
  let { gridProps } = useTable(props, state, ref as RefObject<HTMLElement>);
  let { recordsPerPage = 20, showPage = 1 } = props;
  const [currentPage, setCurrentPage] = useState(showPage);
  // console.log(wrapperProps);
  return (
    <TableWrapper {...wrapperProps}>
      <TableBase
        {...gridProps}
        ref={ref}
        currentPage={currentPage}
        totalPages={calcTotalPages(
          [...state.collection.body.childNodes].length,
          recordsPerPage,
        )}
        currentlyVisibleRange={[
          (currentPage - 1) * recordsPerPage,
          currentPage * recordsPerPage,
        ]}
        recordsPerPage={recordsPerPage}
        {...otherProps}
        styles={tableStyles}
      >
        <TableHeadSection
          state={state}
          stickyHeader={props.stickyHeader}
          styles={headerStyles}
        >
          {props.paginated ? (
            <TablePaginationHeader setPage={setCurrentPage} />
          ) : null}
        </TableHeadSection>
        <TableBodySection
          state={state}
          styles={bodyStyles}
          IsEmpty={props.IsEmpty}
        />
        {props.showFooter &&
        [...state.collection.body.childNodes].length !== 0 ? (
          <TableFooter
            styles={footerStyles}
            currentPage={currentPage}
            totalRecords={[...state.collection.body.childNodes].length}
            paginated={props.paginated || false}
            recordsPerPage={recordsPerPage}
          />
        ) : (
          <></>
        )}
      </TableBase>
    </TableWrapper>
  );
});

const TableFooter = (
  props: BaseProps & {
    currentPage: number;
    recordsPerPage: number;
    totalRecords: number;
    paginated: boolean;
  },
) => {
  let {
    currentPage,
    recordsPerPage,
    paginated,
    totalRecords,
    styles,
    ...otherProps
  } = props;
  let currentlyVisible = totalRecords;
  let totalPages = calcTotalPages(totalRecords, recordsPerPage);
  if (paginated) {
    if (currentPage === totalPages) {
      currentlyVisible = totalRecords % recordsPerPage;
    } else currentlyVisible = recordsPerPage;
  }
  return (
    <TableRowGroup
      as={'tfoot'}
      styles={{ height: '40px', fill: '#f9f9fe', ...styles }}
      {...otherProps}
    >
      <Tr>
        <Td colSpan={'100%'} styles={{ textAlign: 'center', fontWeight: 400 }}>
          Showing {currentlyVisible} of {totalRecords} results.
        </Td>
      </Tr>
    </TableRowGroup>
  );
};
