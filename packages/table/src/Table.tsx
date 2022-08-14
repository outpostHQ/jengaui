import { useTable } from '@react-aria/table';
import { useTableState } from '@react-stately/table';
import { forwardRef, RefObject, useRef, useState } from 'react';
import { TableBase, TableWrapper, Td, Tr } from './TableElementsBase';
import { TableHeadSection } from './TableHeadSection';
import { TableBodySection } from './TableBodySection';
import { JengaPaginatedTableProps } from './types';
import { useCombinedRefs } from '@jenga-ui/utils';
import { useProviderProps } from '@jenga-ui/core';
import { filterBaseProps } from 'tastycss';
import { TableRowGroup } from './TableRowGroup';
import { TablePaginationHeader } from './TablePaginationHeader';

const DEFAULT_RECORDS_PER_PAGE = 100;

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

const withDefaultTableProps = (props) => {
  for (let key of Object.keys(DefaultTableProps)) {
    if (!props.hasOwnProperty(key)) {
      props[key] = DefaultTableProps[key];
    }
  }
  return props;
};

export const Table = forwardRef(
  (
    props: JengaPaginatedTableProps & {
      paginated?: boolean;
      showFooter?: boolean;
    },
    ref,
  ) => {
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

    let { recordsPerPage, defaultPage = 1, showPage, totalPages } = props;
    const totalRecords = state.collection.rows.length - 1;
    if (props.paginated) {
      if (totalPages && !recordsPerPage) {
        //updating pages and records per page ... priority given to recordsPerPage prop over totalPagesProp.
        recordsPerPage = totalRecords / totalPages;
      } else {
        if (recordsPerPage) {
          if (recordsPerPage > totalRecords) recordsPerPage = totalRecords;
          if (recordsPerPage < 0) recordsPerPage = DEFAULT_RECORDS_PER_PAGE;
          totalPages = parseInt((totalRecords / recordsPerPage).toFixed(0));
          totalPages += totalRecords % recordsPerPage === 0 ? 0 : 1;
        } else {
          recordsPerPage = DEFAULT_RECORDS_PER_PAGE;
          totalPages = parseInt((totalRecords / recordsPerPage).toFixed(0));
          totalPages += totalRecords % recordsPerPage === 0 ? 0 : 1;
        }
      }
    } else {
      recordsPerPage = totalRecords;
      totalPages = 1;
    }
    const [currentPage, setCurrentPage] = useState(showPage || defaultPage);

    return (
      <TableWrapper {...wrapperProps}>
        <TableBase
          {...gridProps}
          ref={ref}
          {...otherProps}
          styles={tableStyles}
          paginated={props.paginated}
          currentlyVisibleRange={[
            recordsPerPage * (currentPage - 1),
            recordsPerPage * currentPage,
          ]}
        >
          <TableHeadSection
            state={state}
            stickyHeader={props.stickyHeader}
            styles={headerStyles}
          >
            {props.paginated && totalPages !== 1 ? (
              <TablePaginationHeader
                pages={totalPages}
                setPage={setCurrentPage}
                currentPage={currentPage}
              />
            ) : null}
          </TableHeadSection>
          <TableBodySection
            state={state}
            styles={bodyStyles}
            IsEmpty={props.IsEmpty}
          />
          {props.showFooter && state.collection.rows.length - 1 !== 0 ? (
            <TableRowGroup
              as={'tfoot'}
              styles={{ height: '40px', fill: '#f9f9fe', ...footerStyles }}
            >
              <Tr>
                <Td
                  colSpan={'100%'}
                  styles={{ textAlign: 'center', fontWeight: 400 }}
                >
                  Showing {state.collection.rows.length - 1} of{' '}
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
  },
);
