import { useTableRowGroup } from '@react-aria/table';
import { AllBaseProps, tasty } from 'tastycss';

const Element = tasty({});

export function TableRowGroup(props: AllBaseProps) {
  const { children, styles, ...otherProps } = props;
  let { rowGroupProps } = useTableRowGroup();
  return (
    <Element {...otherProps} {...rowGroupProps} styles={{ ...styles }}>
      {children}
    </Element>
  );
}
