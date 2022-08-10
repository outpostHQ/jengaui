import { mergeProps, useFocus } from '@jenga-ui/utils';
import { useRef } from 'react';
import { useTableColumnHeader } from '@react-aria/table';
import { Th } from './TableElementsBase';
import { JengaTableColumnHeaderProps } from './types';
import { AligmentFromDTCatalog } from './ReactStatelyCollections';

export function TableColumnHeader(props: JengaTableColumnHeaderProps) {
  const { item: column, state, styles = {}, ...otherProps } = props;
  let ref = useRef(null);
  let { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref,
  );
  let { isFocused, focusProps } = useFocus({ isDisabled: false });
  let arrowIcon = state.sortDescriptor?.direction === 'ascending' ? '▲' : '▼';
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
        outline: isFocused ? '2px solid orange' : 'none',
        cursor: 'default',
        color: 'rgba(43, 41, 98, 1)',
        textAlign: align,
        ...styles,
      }}
      ref={ref}
      {...otherProps}
    >
      {column.rendered}
      {column.props.allowsSorting && (
        <span
          aria-hidden="true"
          style={{
            padding: '0 2px',
            visibility:
              state.sortDescriptor?.column === column.key
                ? 'visible'
                : 'hidden',
          }}
        >
          {arrowIcon}
        </span>
      )}
    </Th>
  );
}
