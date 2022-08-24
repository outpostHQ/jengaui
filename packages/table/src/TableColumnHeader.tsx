import { mergeProps, useFocus } from '@jenga-ui/utils';
import { useRef } from 'react';
import { useTableColumnHeader } from '@react-aria/table';
import { Th } from './TableElementsBase';
import { JengaTableColumnHeaderProps } from './types';
import { AligmentFromDTCatalog } from './ReactStatelyCollections';
import { Flex } from '@jenga-ui/layout';

export function TableColumnHeader(props: JengaTableColumnHeaderProps) {
  const { item: column, state, styles = {}, ...otherProps } = props;
  let ref = useRef(null);
  let { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref,
  );
  let { isFocused, focusProps } = useFocus({ isDisabled: false });

  const colspan = column.colspan ? column.colspan : 1;
  const align =
    column.props.align ||
    AligmentFromDTCatalog[column.props.dataType || 'generic'] ||
    'left';
  const sortState =
    state.sortDescriptor?.column === column.key
      ? state.sortDescriptor?.direction
      : 'unknown';
  // console.log(sortState, state);
  return (
    <Th
      {...mergeProps(columnHeaderProps, focusProps)}
      colSpan={colspan}
      styles={{
        outline: isFocused ? '2px solid orange' : 'none',
        cursor: 'default',
        color: 'rgba(43, 41, 98, 1)',
        ...column.props.styles,
        ...column.props.colCellStyles,
        ...styles,
      }}
      ref={ref}
      {...otherProps}
    >
      <Flex
        height="100%"
        width="100%"
        alignItems={'center'}
        justifyContent={align}
      >
        {column.props.allowsSorting && (
          <Flex
            flow={'column'}
            display={'inline-flex'}
            alignItems={'center'}
            margin={'0 3px'}
            gap={'2px'}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderBottom: `5px solid ${
                  sortState === 'ascending' ? 'black' : 'lightgrey'
                }`,
              }}
            ></div>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `5px solid ${
                  sortState === 'descending' ? 'black' : 'lightgrey'
                }`,
              }}
            ></div>
          </Flex>
        )}
        {column.rendered}
      </Flex>
    </Th>
  );
}
