import { mergeProps, useFocus } from '@jenga-ui/utils';
import { useRef } from 'react';
import { useTableColumnHeader } from '@react-aria/table';
import { Th } from './TableElementsBase';
import { JengaTableColumnHeaderProps } from './types';
import { AligmentFromDTCatalog } from './ReactStatelyCollections';
import {
  CaretDownFilled,
  CaretDownOutlined,
  CaretUpFilled,
  CaretUpOutlined,
} from '@ant-design/icons';
import { Space } from '@jenga-ui/layout';
import { Text } from '@jenga-ui/content';
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

  return (
    <Th
      {...mergeProps(columnHeaderProps, focusProps)}
      colSpan={colspan}
      styles={{
        // textAlign: colspan > 1 ? 'center' : 'left',
        // display: 'inline-grid',
        // alignItems: 'center',
        // width: '100%',
        outline: isFocused ? '2px solid orange' : 'none',
        cursor: 'default',
        color: 'rgba(43, 41, 98, 1)',
        textAlign: align,
        ...styles,
      }}
      ref={ref}
      {...otherProps}
    >
      <Text>{column.rendered}</Text>
      {column.props.allowsSorting && (
        <Space
          flow={'column'}
          height={'100%'}
          gap={'3px'}
          display={'inline-flex'}
          alignItems={'center'}
          styles={{ marginLeft: '3px' }}
        >
          {/* {state.sortDescriptor?.direction === 'ascending' ? (
            <CaretUpFilled style={{ margin: '0', padding: '0' }} />
          ) : (
            <CaretUpOutlined />
          )}
          {state.sortDescriptor?.direction === 'descending' ? (
            <CaretDownFilled />
          ) : (
            <CaretDownOutlined />
          )} */}
          <svg
            style={{
              transform: 'rotate(180deg)',
              width: '10px',
              height: '10px',
            }}
          >
            <polygon
              points="0,0 10,0 5,5"
              style={{
                fill: `${
                  state.sortDescriptor?.column === column.key &&
                  state.sortDescriptor?.direction === 'descending'
                    ? 'black'
                    : 'lightgray'
                }`,
              }}
            />
            {/* {console.error('svg not supported')} */}
          </svg>

          <svg
            style={{
              width: '10px',
              height: '10px',
            }}
          >
            <polygon
              points="0,0 10,0 5,5"
              style={{
                fill: `${
                  state.sortDescriptor?.column === column.key &&
                  state.sortDescriptor?.direction === 'ascending'
                    ? 'black'
                    : 'lightgray'
                }`,
              }}
            />
            {/* {console.error('svg not supported')} */}
          </svg>
        </Space>
      )}
    </Th>
  );
}
