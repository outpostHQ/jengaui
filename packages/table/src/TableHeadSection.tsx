import { useContext } from 'react';
import { TableColumnHeader } from './TableColumnHeader';
import { JengaTablePropsContext } from './TableElementsBase';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRowGroup } from './TableRowGroup';
import { TableSelectAllCell } from './TableSelectAllCells';
import { JengaTableHeadProps } from './types';

export const TableHeadSection = (props: JengaTableHeadProps) => {
  const {
    state,
    stickyHeader = false,
    styles,
    children,
    ...otherProps
  } = props;
  const { collection } = state;
  const { cellPadding } = useContext(JengaTablePropsContext);
  const stickyStyles: { position?: 'sticky'; top?: 0 } = stickyHeader
    ? { position: 'sticky', top: 0 }
    : {};
  console.log(stickyStyles);
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
      {children}
      {collection.headerRows.map((headerRow) => (
        <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
          {[...headerRow.childNodes].map((column) =>
            column.props.isSelectionCell ? (
              <TableSelectAllCell
                key={column.key}
                item={column}
                state={state}
                styles={{ padding: cellPadding }}
              />
            ) : (
              <TableColumnHeader
                key={column.key}
                item={column}
                state={state}
                styles={{ padding: cellPadding }}
              />
            ),
          )}
        </TableHeaderRow>
      ))}
    </TableRowGroup>
  );
};
