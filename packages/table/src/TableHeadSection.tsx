import { TableColumnHeader } from './TableColumnHeader';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRowGroup } from './TableRowGroup';
import { TableSelectAllCell } from './TableSelectAllCells';
import { JengaTableHeadProps } from './types';

export const TableHeadSection = (props: JengaTableHeadProps) => {
  const { state, stickyHeader = false, cellPadding, ...otherProps } = props;
  const { collection } = state;
  console.log(collection);
  const stickyStyles: { position?: 'sticky'; top?: 0 } = stickyHeader
    ? { position: 'sticky', top: 0 }
    : {};
  return (
    <TableRowGroup
      as={'thead'}
      styles={{
        background: '#fff',
        ...stickyStyles,
      }}
      {...otherProps}
    >
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
