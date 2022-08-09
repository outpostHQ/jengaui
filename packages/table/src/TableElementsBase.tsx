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
  styles: {
    borderTop: '1px solid #E5E5FC',
  },
});

export const TableTemplate = tasty(Element, {
  as: 'table',
});
export const TableBase = forwardRef((props: BaseProps, ref) => {
  const { styles, ...otherProps } = props;
  return (
    <TableTemplate
      styles={{ border: '1px solid #E5E5FC', borderRadius: '8px', ...styles }}
      {...otherProps}
      ref={ref}
    />
  );
});
//created in order to make it easy to apply styles for specific tags
//Note:if no styles needed then just delete this and just use Element=tasty({}) then <Element as={'t{d| h| r}'} />
