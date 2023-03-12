import { mergeProps, useFocus } from '@jengaui/utils';
import { useRef } from 'react';
import { useTableColumnHeader } from '@react-aria/table';
import { Flex } from '@jengaui/layout';
import { useHover } from '@react-aria/interactions';

import { Th } from './TableElementsBase';
import { JengaTableColumnHeaderProps } from './types';
import { AligmentFromDTCatalog } from './ReactStatelyCollections';

export function TableColumnHeader<T>(props: JengaTableColumnHeaderProps<T>) {
  const { item: column, state, styles = {}, isDisabled, ...otherProps } = props;
  let ref = useRef(null);
  let { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref,
  );
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { isFocused, focusProps } = useFocus({ isDisabled });

  const colspan = column.colspan ? column.colspan : 1;
  const align =
    column.props.align ||
    AligmentFromDTCatalog[column.props.dataType || 'generic'] ||
    'left';
  const sortState =
    state.sortDescriptor?.column === column.key
      ? state.sortDescriptor?.direction
      : 'unknown';
  return (
    <Th
      {...mergeProps(columnHeaderProps, focusProps, hoverProps)}
      ref={ref}
      colSpan={colspan}
      mods={{
        ...(column.props?.mods || {}),
        focused: isFocused,
        hovered: isHovered,
      }}
      styles={{
        outline: { '': 'none', focused: '2px solid orange' },
        cursor: 'default',
        color: 'rgba(43, 41, 98, 1)',
        ...styles,
        ...(column.props?.colCellStyles || {}),
        ...(column.props?.styles || {}),
      }}
      {...otherProps}
    >
      {column.props.allowsSorting ? (
        <Flex
          height="100%"
          width="100%"
          alignItems={'center'}
          justifyContent={align}
        >
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

          {column.rendered}
        </Flex>
      ) : (
        column.rendered
      )}
    </Th>
  );
}
