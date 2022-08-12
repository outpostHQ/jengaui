import { GridNode } from '@react-types/grid';
import { AligmentFromDTCatalog } from './ReactStatelyCollections';
import { TableCell } from './TableCell';
import { TableCheckboxCell } from './TableCheckboxCell';
import { TableRow } from './TableRow';
import { TableRowGroup } from './TableRowGroup';
import { JengaTableBodyProps } from './types';

export const TableBodySection = (props: JengaTableBodyProps) => {
  const { state, cellPadding, currentShow = [0, 1000], ...otherProps } = props;
  const { collection } = state;
  if ([...collection.body.childNodes].length === 0) return <></>;
  return (
    <TableRowGroup as="tbody">
      {[...collection.body.childNodes].map((row) => (
        <TableRow
          key={row.key}
          item={row}
          state={state}
          currentShow={currentShow}
          styles={{ borderTop: '1px solid #E5E5FC' }}
        >
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
