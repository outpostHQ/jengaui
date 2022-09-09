import { JengaCheckboxProps } from '@jengaui/checkbox';
import { createContext, forwardRef } from 'react';
import { tasty, Element, Styles, AllBaseProps } from 'tastycss';

import { JengaTableBaseProps } from './types';

export const Tr = tasty<AllBaseProps & HTMLTableRowElement>({
  as: 'tr',
  role: 'row',
});

export const Th = tasty<AllBaseProps & HTMLTableCellElement>({
  as: 'th',
  role: 'gridcell',
});

export const Td = tasty<AllBaseProps & HTMLTableCellElement>({
  as: 'td',
  role: 'gridcell',
  // styles: {
  //   borderTop: '1px solid #E5E5FC',
  // },
});

export const TableWrapper = tasty({
  // width: ['740px', '580px'],
  styles: {
    borderRadius: '8px',
    border: '1px solid #e5e5fc',
    overflow: 'auto',
    // width: [
    //   // '740px max 740px min 740px',
    //   // '580px max 580px min 580px',
    //   '200px max 200px min 200px',
    // ],
    height: [' 200px max 200px min 200px'],
    styledScrollbar: true,
    position: 'relative',
    padding: '0',
  },
});

export const TableTemplate = tasty(Element, {
  as: 'table',
});

export const JengaTablePropsContext = createContext<{
  zebraStripes: boolean;
  paginated: boolean;
  pages?: number;
  currentPage?: number;
  currentlyVisibleRange?: [number, number];
  recordsPerPage?: number;
  cellPadding: string | string[];
  checkboxAdditionalProps?: JengaCheckboxProps;
  checkboxStyles?: Styles;
  totalPages?: number;
}>({ zebraStripes: false, paginated: false, cellPadding: '10px' });

const cellPaddingCatalog = {
  dense: '6px 12px',
  regular: '16px 12px',
  spacious: '12px',
};
const parseCellPadding = (cellPadding: string | string[]) => {
  if (Array.isArray(cellPadding)) {
    return cellPadding.map((cp) =>
      cellPaddingCatalog.hasOwnProperty(cp) ? cellPaddingCatalog[cp] : cp,
    );
  }
  return cellPaddingCatalog.hasOwnProperty(cellPadding)
    ? cellPaddingCatalog[cellPadding]
    : cellPadding;
};

export const TableBase = forwardRef(function _TableBase(
  props: JengaTableBaseProps,
  ref,
) {
  let {
    styles,
    zebraStripes = false,
    paginated = false,
    currentlyVisibleRange = [0, Infinity],
    cellPadding = ['regular', 'dense'],
    checkboxAdditionalProps = {},
    checkboxStyles = {},
    currentPage = 1,
    totalPages = 1,
    recordsPerPage = 20,
    ...otherProps
  } = props;
  if (totalPages < 1) totalPages = 1;
  return (
    <JengaTablePropsContext.Provider
      value={{
        zebraStripes: zebraStripes,
        paginated: paginated,
        currentlyVisibleRange: currentlyVisibleRange,
        currentPage: currentPage,
        recordsPerPage: recordsPerPage,
        cellPadding: parseCellPadding(cellPadding),
        checkboxAdditionalProps: checkboxAdditionalProps,
        checkboxStyles: checkboxStyles,
        totalPages: totalPages,
      }}
    >
      <TableTemplate
        styles={{
          borderCollapse: 'collapse',
          display: 'table',
          height: '100%',
          width: '100%',
          fill: '#fffff',
          ...styles,
        }}
        {...otherProps}
        ref={ref}
      />
    </JengaTablePropsContext.Provider>
  );
});
//created in order to make it easy to apply styles for specific tags
//Note:if no styles needed then just delete this and just use Element=tasty({}) then <Element as={'t{d| h| r}'} />
