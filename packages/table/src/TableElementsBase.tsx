import { Block, JengaCheckboxProps } from '@jenga-ui/core';
import { createContext, forwardRef } from 'react';
import { tasty, Element, Styles } from 'tastycss';
import { JengaTableBaseProps } from './types';

export const Tr = tasty({
  as: 'tr',
});

export const Th = tasty({
  as: 'th',
});

export const Td = tasty({
  as: 'td',
  // styles: {
  //   borderTop: '1px solid #E5E5FC',
  // },
});

export const TableWrapper = tasty(Block, {
  // width: ['740px', '580px'],
  border: '1px solid #E5E5FC',
  styles: {
    borderRadius: '8px',
    overflow: 'auto',
    width: ' 300px max 300px min 300px',
    height: ' 300px max 300px min 300px',
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
  checkboxPosition?: string;
}>({ zebraStripes: false, paginated: false, cellPadding: '10px' });

const cellPaddingCatalog = {
  dense: '3px',
  regular: '8px',
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

export const TableBase = forwardRef((props: JengaTableBaseProps, ref) => {
  const {
    styles,
    zebraStripes = false,
    paginated = false,
    currentlyVisibleRange = [0, 1000],
    cellPadding,
    checkboxAdditionalProps,
    checkboxPosition,
    checkboxStyles,
    ...otherProps
  } = props;

  return (
    <JengaTablePropsContext.Provider
      value={{
        zebraStripes: zebraStripes,
        paginated: paginated,
        currentlyVisibleRange: currentlyVisibleRange,
        cellPadding: parseCellPadding(cellPadding),
        checkboxAdditionalProps: checkboxAdditionalProps,
        checkboxStyles: checkboxStyles,
        checkboxPosition: checkboxPosition,
      }}
    >
      <TableTemplate
        styles={{
          borderCollapse: 'collapse',
          display: 'table',

          height: '100%',
          width: '100%',
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
