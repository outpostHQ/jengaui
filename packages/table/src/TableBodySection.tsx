import { GridNode } from '@react-types/grid';
import { useContext } from 'react';
import { Styles } from 'tastycss';

import { AligmentFromDTCatalog } from './ReactStatelyCollections';
import { TableCell } from './TableCell';
import { TableCheckboxCell } from './TableCheckboxCell';
import { JengaTablePropsContext } from './TableElementsBase';
import { TableRow } from './TableRow';
import { TableRowGroup } from './TableRowGroup';
import { JengaTableBodyProps } from './types';

export function TableBodySection<T>(props: JengaTableBodyProps<T>) {
  const { state, alternateBody, showAlternateBody, onEmpty, ...otherProps } =
    props;
  const { collection } = state;
  const { cellPadding } = useContext(JengaTablePropsContext);

  return (
    <TableRowGroup as="tbody" {...otherProps}>
      {showAlternateBody
        ? alternateBody
        : [...collection.body.childNodes].length === 0
        ? onEmpty
        : [...collection.body.childNodes].map((row) => (
            <TableRow
              key={row.key}
              item={row}
              state={state}
              styles={{
                borderTop: '1px solid #E5E5FC',
              }}
            >
              {[...row.childNodes].map((cell: GridNode<T>) => {
                const align =
                  cell.column?.props.align ||
                  AligmentFromDTCatalog[
                    cell.column?.props.dataType || 'generic'
                  ] ||
                  'left';
                const stylesFromColumn =
                  (cell.column?.props.colCellStyles as Styles) || {};

                return cell.props.isSelectionCell ? (
                  <TableCheckboxCell
                    key={cell.key}
                    item={cell}
                    state={state}
                    styles={{
                      padding: cellPadding,
                      textAlign: align,
                      ...stylesFromColumn,
                    }}
                  />
                ) : (
                  <TableCell
                    key={cell.key}
                    item={cell}
                    state={state}
                    styles={{
                      padding: cellPadding,
                      textAlign: align,
                      ...stylesFromColumn,
                    }}
                  />
                );
              })}
            </TableRow>
          ))}
    </TableRowGroup>
  );
}
