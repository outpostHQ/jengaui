import { useTable } from '@react-aria/table';
import { useTableState } from '@react-stately/table';
import { useRef, useState } from 'react';
import { TableBase } from './TableElementsBase';
import { TableHeadSection } from './TableHeadSection';
import { TableBodySection } from './TableBodySection';
import { Flex } from '@jenga-ui/layout';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button, Text } from '@jenga-ui/core';

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
        onClick={() => {
          setPage(currentPage - 1);
        }}
      />
      {[...Array(pages < 5 ? 5 : pages)].map((page) => (
        <Button
          styles={{
            padding: '0',
            margin: '3px',
            width: '10px',
            aspectRatio: 1,
            borderRadius: '50%',
            fill: page + 1 === currentPage ? '#black' : '#BCBCBC',
            border: '1px solid black',
          }}
          onClick={() => {
            setPage(page);
          }}
        />
      ))}
      <Button
        type={'clear'}
        icon={<RightCircleOutlined />}
        onClick={() => {
          setPage(currentPage + 1);
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

export function PaginatedTable(props) {
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
    paginate = false,
    recordsPerPage = 5,
    defaultPage = 1,
    ...otherProps
  } = props;
  let state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === 'multiple' && selectionBehavior !== 'replace',
  });
  // console.log(state.selectionManager.selectedKeys);

  let ref = useRef(null);
  let { gridProps } = useTable(props, state, ref);
  // console.log(state.collection.rows);
  const pages = state.collection.rows.length - 1 / recordsPerPage;
  console.log(pages);
  const [currentPage, setCurrentPage] = useState(defaultPage || 1);
  return (
    <>
      <TablePaginationHeader
        pages={pages}
        setPage={setCurrentPage}
        currentPage={currentPage}
      />
      <TableBase
        {...gridProps}
        ref={ref}
        styles={{ borderCollapse: 'separate' }}
        selectionMode={selectionMode}
        selectionBehavior={selectionBehavior}
        {...otherProps}
      >
        <TableHeadSection state={state} cellPadding={cellPadding} />
        <TableBodySection state={state} cellPadding={cellPadding} />
      </TableBase>
      <TablePaginationBottomBar pages={pages} currentPage={currentPage} />
    </>
  );
}
