import { Block } from '@jenga-ui/core';
import { TableStateProps } from '@react-stately/table';
import { forwardRef } from 'react';
import { tasty, Element, BaseProps } from 'tastycss';

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
export const TableBase = forwardRef(
  (
    props: BaseProps &
      TableStateProps<HTMLTableElement> & { currentShow?: [number, number] },
    ref,
  ) => {
    const { styles, ...otherProps } = props;
    return (
      <TableTemplate
        styles={{
          borderCollapse: 'collapse',
          width: '100%',
          position: 'relative',
          ...styles,
        }}
        {...otherProps}
        ref={ref}
      />
    );
  },
);
//created in order to make it easy to apply styles for specific tags
//Note:if no styles needed then just delete this and just use Element=tasty({}) then <Element as={'t{d| h| r}'} />
