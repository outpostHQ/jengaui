import { Checkbox } from '@jengaui/checkbox';
import {
  useTableColumnHeader,
  useTableSelectAllCheckbox,
} from '@react-aria/table';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useContext, useRef } from 'react';

import { JengaTablePropsContext, Th } from './TableElementsBase';
import { JengaTableElementBaseProps } from './types';

export function TableSelectAllCell<T>(props: JengaTableElementBaseProps<T>) {
  const { state, item: column, ...otherProps } = props;
  let ref = useRef(null);
  let isSingleSelectionMode = state.selectionManager.selectionMode === 'single';
  let { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref,
  );
  const { checkboxProps: jengaCheckboxProps, checkboxStyles } = useContext(
    JengaTablePropsContext,
  );
  let { checkboxProps } = useTableSelectAllCheckbox(state);
  const { styles: checkboxStylesFromProps, ...otherCheckboxProps } =
    jengaCheckboxProps;
  return (
    <Th {...columnHeaderProps} {...otherProps} ref={ref}>
      {isSingleSelectionMode ? (
        <VisuallyHidden>{checkboxProps['aria-label']}</VisuallyHidden>
      ) : (
        <Checkbox
          {...otherCheckboxProps}
          {...checkboxProps}
          styles={{ ...checkboxStylesFromProps, ...checkboxStyles }}
        />
      )}
    </Th>
  );
}
