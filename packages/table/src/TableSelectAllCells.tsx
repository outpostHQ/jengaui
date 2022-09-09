import { Checkbox } from '@jengaui/checkbox';
import {
  useTableColumnHeader,
  useTableSelectAllCheckbox,
} from '@react-aria/table';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useContext, useRef } from 'react';

import { JengaTablePropsContext, Th } from './TableElementsBase';
import { JengaTableElementBaseProps } from './types';

export function TableSelectAllCell(props: JengaTableElementBaseProps) {
  const { state, item: column, ...otherProps } = props;
  let ref = useRef(null);
  let isSingleSelectionMode = state.selectionManager.selectionMode === 'single';
  let { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref,
  );
  const { checkboxAdditionalProps, checkboxStyles } = useContext(
    JengaTablePropsContext,
  );
  let { checkboxProps } = useTableSelectAllCheckbox(state);

  return (
    <Th {...columnHeaderProps} {...otherProps} ref={ref}>
      {isSingleSelectionMode ? (
        <VisuallyHidden>{checkboxProps['aria-label']}</VisuallyHidden>
      ) : (
        <Checkbox
          {...checkboxProps}
          {...checkboxAdditionalProps}
          styles={checkboxStyles}
        />
      )}
    </Th>
  );
}
