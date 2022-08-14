import { useTable } from '@react-aria/table';
import { useTableState } from '@react-stately/table';
import { forwardRef, RefObject, useRef, useState } from 'react';
import { TableBase, TableWrapper, Td, Th, Tr } from './TableElementsBase';
import { TableHeadSection } from './TableHeadSection';
import { TableBodySection } from './TableBodySection';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Flex,
  useCombinedRefs,
  useProviderProps,
} from '@jenga-ui/core';
import { JengaPaginatedTableProps } from './types';
import { TableRowGroup } from './TableRowGroup';
import { filterBaseProps } from 'tastycss';
import { TablePaginationHeader } from './TablePaginationHeader';

const DEFAULT_RECORDS_PER_PAGE = 100;

const DefaultTableProps = {
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

export const PaginatedTable = forwardRef(
  (props: JengaPaginatedTableProps, ref) => {
    props = withDefaultTableProps(useProviderProps(props));
    let {
      recordsPerPage,
      defaultPage = 1,
      showPage,
      totalPages,
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
    //test refs.
    const totalRecords = state.collection.rows.length - 1;
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

    const [currentPage, setCurrentPage] = useState(showPage || defaultPage);
    console.log([
      recordsPerPage * (currentPage - 1),
      recordsPerPage * currentPage,
    ]);
    return (
      <TableWrapper {...wrapperProps}>
        <TableBase
          {...gridProps}
          ref={ref}
          paginated={true}
          currentlyVisibleRange={[
            recordsPerPage * (currentPage - 1),
            recordsPerPage * currentPage,
          ]}
          {...otherProps}
        >
          <TableHeadSection
            stickyHeader={props.stickyHeader}
            state={state}
            styles={headerStyles}
          >
            <TablePaginationHeader
              pages={totalPages}
              setPage={setCurrentPage}
              currentPage={currentPage}
            />
          </TableHeadSection>
          <TableBodySection
            state={state}
            styles={bodyStyles}
            IsEmpty={props.IsEmpty}
          />
        </TableBase>
      </TableWrapper>
    );
  },
);
