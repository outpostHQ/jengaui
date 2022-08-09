import { TableState } from '@react-stately/table';
import { TableCollection } from '@react-types/table';
import { BaseProps } from 'tastycss';
import { TableColumnHeader } from './TableColumnHeader';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRowGroup } from './TableRowGroup';
import { TableSelectAllCell } from './TableSelectAllCells';

export const TableHeadSection = (
  props: BaseProps & {
    state: TableState<unknown>;
    cellPadding: string | string[];
  },
) => {
  const { state, cellPadding, ...otherProps } = props;
  const { collection } = state;
  return (
    <TableRowGroup as={'thead'} {...otherProps}>
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
