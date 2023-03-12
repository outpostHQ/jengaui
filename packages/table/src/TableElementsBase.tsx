import { JengaCheckboxProps } from '@jengaui/checkbox';
import {
  createContext,
  // ForwardedRef,
  forwardRef,
  HTMLProps,
  ReactElement,
  Ref,
  // ReactElement,
} from 'react';
import { tasty, Element, Styles, BasePropsWithoutChildren } from 'tastycss';

import { JengaTableBaseProps } from './types';

export const Tr = tasty({
  as: 'tr',
  role: 'row',
});
export const Th = tasty({
  as: 'th',
  role: 'gridcell',
});

export const Td = tasty({
  as: 'td',
  role: 'gridcell',
});

export const TableWrapper = tasty({
  styles: {
    border: '1px solid #e5e5fc',
    overflow: 'auto',
    position: 'relative',
    padding: '0',
  },
});

export const TableTemplate = tasty(Element, {
  as: 'table',
});

export const JengaTablePropsContext = createContext<{
  zebraStripes: boolean;
  cellPadding: string | string[];
  checkboxProps: JengaCheckboxProps;
  checkboxStyles: Styles;
  cellProps: BasePropsWithoutChildren & HTMLProps<HTMLTableCellElement>;
  cellStyles: Styles;
  rowStyles: Styles;
  rowProps: BasePropsWithoutChildren & HTMLProps<HTMLTableRowElement>;
}>({
  zebraStripes: false,
  cellPadding: '10px',
  rowProps: {},
  rowStyles: {},
  cellProps: {},
  cellStyles: {},
  checkboxProps: {},
  checkboxStyles: {},
});

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

export function _TableBase<T>(props: JengaTableBaseProps<T>, ref) {
  let {
    styles,
    zebraStripes = false,
    cellPadding = ['regular', 'dense'],
    checkboxProps = {},
    checkboxStyles = {},
    cellStyles = {},
    cellProps = {},
    rowProps = {},
    rowStyles = {},

    ...otherProps
  } = props;

  return (
    <JengaTablePropsContext.Provider
      value={{
        zebraStripes,
        cellPadding: parseCellPadding(cellPadding),
        checkboxProps,
        checkboxStyles,
        cellStyles,
        cellProps,
        rowProps,
        rowStyles,
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
        role={'Table'}
        {...otherProps}
        ref={ref}
      />
    </JengaTablePropsContext.Provider>
  );
}

export const TableBase = forwardRef(_TableBase) as <T>(
  props: JengaTableBaseProps<T> & { ref?: Ref<unknown> },
) => ReactElement;
//created in order to make it easy to apply styles for specific tags
//Note:if no styles needed then just delete this and just use Element=tasty({}) then <Element as={'t{d| h| r}'} />
