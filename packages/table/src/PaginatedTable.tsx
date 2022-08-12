import { useTable } from '@react-aria/table';
import { useTableState } from '@react-stately/table';
import { forwardRef, RefObject, useRef, useState } from 'react';
import { TableBase, TableWrapper } from './TableElementsBase';
import { TableHeadSection } from './TableHeadSection';
import { TableBodySection } from './TableBodySection';
import { Flex } from '@jenga-ui/layout';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button, Text, useCombinedRefs } from '@jenga-ui/core';
import { JengaPaginatedTableProps } from './types';

const DEFAULT_RECORDS_PER_PAGE = 100;

export const TablePaginationHeader = (props) => {
  const {
    currentPage = 1,
    pages = 1,
    setPage = () => {},
    ...otherProps
  } = props;
  return (
    <Flex
      width="100%"
      height="40px"
      alignItems="center"
      justifyContent="center"
      fill={'#f9f9fe'}
      {...otherProps}
    >
      <Button
        type={'clear'}
        icon={<LeftCircleOutlined />}
        label="show previous results"
        onPress={() => {
          console.log('page->', currentPage);
          if (currentPage !== 1) setPage(currentPage - 1);
        }}
      />
      {[...Array(pages)].map((page, index) => (
        <Button
          type={'clear'}
          key={`btn-pg-${index}`}
          styles={{
            padding: '0',
            margin: '3px',
            width: '10px',
            aspectRatio: 1,
            borderRadius: '50%',
            fill: index + 1 === currentPage ? '#black' : '#BCBCBC',
            border: '1px solid black',
          }}
          onPress={() => {
            console.log('page->', currentPage);
            setPage(index + 1);
          }}
        />
      ))}
      <Button
        type={'clear'}
        icon={<RightCircleOutlined />}
        label="show next results"
        onPress={() => {
          console.log('page->', currentPage);
          if (currentPage !== pages) setPage(currentPage + 1);
        }}
      />
    </Flex>
  );
};

export const TablePaginationBottomBar = (props) => {
  const { currentPage = 1, pages = 1, ...otherProps } = props;
  return (
    <Flex
      width="100%"
      height="40px"
      alignItems="center"
      justifyContent="center"
      fill={'#f9f9fe'}
      {...otherProps}
    >
      <Text>
        Showing {currentPage} of {pages} results.
      </Text>
    </Flex>
  );
};

export const PaginatedTable = forwardRef(
  (props: JengaPaginatedTableProps, ref) => {
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
      recordsPerPage,
      defaultPage = 1,
      stickyHeader = false,
      zebraStripes = false,
      showPage,
      totalPages,
      ...otherProps
    } = props;

    let state = useTableState({
      ...props,
      showSelectionCheckboxes:
        selectionMode === 'multiple' && selectionBehavior !== 'replace',
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
      <TableWrapper>
        <TablePaginationHeader
          pages={totalPages}
          setPage={setCurrentPage}
          currentPage={currentPage}
        />
        <TableBase
          {...gridProps}
          ref={ref}
          styles={{
            borderCollapse: 'collapse',
            width: '100%',
          }}
          paginated={true}
          selectionMode={selectionMode}
          selectionBehavior={selectionBehavior}
          {...otherProps}
          currentlyVisibleRange={[
            recordsPerPage * (currentPage - 1),
            recordsPerPage * currentPage,
          ]}
          cellPadding={cellPadding}
          zebraStripes={zebraStripes}
        >
          <TableHeadSection stickyHeader={stickyHeader} state={state} />
          <TableBodySection state={state} />
        </TableBase>
        <TablePaginationBottomBar
          pages={totalPages}
          currentPage={currentPage}
        />
      </TableWrapper>
    );
  },
);
