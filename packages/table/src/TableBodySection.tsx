import { TableState } from '@react-stately/table';
import { GridNode, GridRow } from '@react-types/grid';
import { BaseProps } from 'tastycss';
import { AligmentFromDTCatalog } from './ReactStatelyCollections';
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
          {[...row.childNodes].map((cell: GridNode<unknown>, index) => {
            // console.log(cell.column?.props.align, cell.column?.props.dataType);
            const align =
              cell.column?.props.align ||
              AligmentFromDTCatalog[cell.column?.props.dataType || 'generic'] ||
              'left';
            return cell.props.isSelectionCell ? (
              <TableCheckboxCell
                key={cell.key}
                item={cell}
                state={state}
                styles={{
                  padding: cellPadding,
                  textAlign: align,
                }}
                {...otherProps}
              />
            ) : (
              <TableCell
                key={cell.key}
                item={cell}
                state={state}
                styles={{
                  padding: cellPadding,
                  textAlign: align,
                }}
                {...otherProps}
              />
            );
          })}
        </TableRow>
      ))}
    </TableRowGroup>
  );
};
