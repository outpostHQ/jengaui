import { TableState } from '@react-stately/table';
import { BaseProps } from 'tastycss';
import { TableCell } from './TableCell';
import { TableCheckboxCell } from './TableCheckboxCell';
import { TableRow } from './TableRow';
import { TableRowGroup } from './TableRowGroup';

export const TableBodySection = (
  props: BaseProps & {
    state: TableState<unknown>;
    cellPadding: string | string[];
  },
) => {
  const { state, cellPadding, ...otherProps } = props;
  const { collection } = state;
  return (
    <TableRowGroup as="tbody" styles={{ borderCollapse: 'collapse' }}>
      {[...collection.body.childNodes].map((row) => (
        <TableRow key={row.key} item={row} state={state}>
          {[...row.childNodes].map((cell) =>
            cell.props.isSelectionCell ? (
              <TableCheckboxCell
                key={cell.key}
                item={cell}
                state={state}
                styles={{ padding: cellPadding }}
              />
            ) : (
              <TableCell
                key={cell.key}
                item={cell}
                state={state}
                styles={{ padding: cellPadding }}
              />
            ),
          )}
        </TableRow>
      ))}
    </TableRowGroup>
  );
};
