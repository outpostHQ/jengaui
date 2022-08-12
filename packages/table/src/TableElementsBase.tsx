import { Block } from '@jenga-ui/core';
import { TableStateProps } from '@react-stately/table';
import { createContext, forwardRef } from 'react';
import { tasty, Element, BaseProps } from 'tastycss';
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
  width: ['740px', '580px'],
  border: '1px solid #E5E5FC',
  styles: {
    borderRadius: '8px',
    overflowY: 'auto',
    styledScrollbar: true,
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
}>({ zebraStripes: false, paginated: false, cellPadding: '10px' });
export const TableBase = forwardRef((props: JengaTableBaseProps, ref) => {
  const {
    styles,
    zebraStripes = false,
    paginated = false,
    currentlyVisibleRange = [0, 1000],
    cellPadding = '10px',
    ...otherProps
  } = props;

  return (
    <JengaTablePropsContext.Provider
      value={{
        zebraStripes: zebraStripes,
        paginated: paginated,
        currentlyVisibleRange: currentlyVisibleRange,
        cellPadding: cellPadding,
      }}
    >
      <TableTemplate
        styles={{
          borderCollapse: 'collapse',
          width: '100%',
          height: '100%',
          position: 'relative',
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
