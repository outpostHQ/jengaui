import { useContext } from 'react';

import { TableColumnHeader } from './TableColumnHeader';
import { JengaTablePropsContext } from './TableElementsBase';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRowGroup } from './TableRowGroup';
import { TableSelectAllCell } from './TableSelectAllCells';
import { JengaTableHeadProps } from './types';

export function TableHeadSection<T>(props: JengaTableHeadProps<T>) {
  const {
    state,
    stickyHeader = false,
    styles,
    children,
    headerRowProps,
    customHeaderPosition,
    ...otherProps
  } = props;
  const { collection } = state;
  const { cellPadding } = useContext(JengaTablePropsContext);
  const stickyStyles: { position?: 'sticky'; top?: 0 } = stickyHeader
    ? { position: 'sticky', top: 0 }
    : {};

  return (
    <TableRowGroup
      as={'thead'}
      styles={{
        background: '#fff',
        zIndex: 1,
        ...stickyStyles,
        ...styles,
      }}
      {...otherProps}
    >
      {customHeaderPosition === 'top' && children}
      {collection.headerRows.map((headerRow) => (
        <TableHeaderRow
          key={headerRow.key}
          item={headerRow}
          state={state}
          {...headerRowProps}
        >
          {[...headerRow.childNodes].map((column) =>
            column.props.isSelectionCell ? (
              <TableSelectAllCell
                key={column.key}
                item={column}
                state={state}
                element={'TableSelectAllElement'}
                styles={{ padding: cellPadding }}
              />
            ) : (
              <TableColumnHeader
                key={column.key}
                item={column}
                element={'TableColumnElement'}
                state={state}
                styles={{ padding: cellPadding }}
              />
            ),
          )}
        </TableHeaderRow>
      ))}
      {customHeaderPosition === 'bottom' && children}
    </TableRowGroup>
  );
}
