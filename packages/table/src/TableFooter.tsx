import { BaseProps } from 'tastycss';

import { Td, Tr } from './TableElementsBase';
import { TableRowGroup } from './TableRowGroup';

export const TableFooter = (
  props: BaseProps & {
    totalRecords: number;
  },
) => {
  const { totalRecords, styles, ...otherProps } = props;
  if (totalRecords === 0) return <></>;
  return (
    <TableRowGroup
      as={'tfoot'}
      styles={{ height: '40px', fill: '#f9f9fe', ...styles }}
      {...otherProps}
    >
      <Tr>
        <Td colSpan={'100%'} styles={{ textAlign: 'center', fontWeight: 400 }}>
          Showing {totalRecords} results.
        </Td>
      </Tr>
    </TableRowGroup>
  );
};
