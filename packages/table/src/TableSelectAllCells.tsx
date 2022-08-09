import { Checkbox } from '@jenga-ui/checkbox';
import {
  useTableColumnHeader,
  useTableSelectAllCheckbox,
} from '@react-aria/table';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useRef } from 'react';
import { Th } from './TableElementsBase';
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
  let { checkboxProps } = useTableSelectAllCheckbox(state);

  return (
    <Th {...columnHeaderProps} {...otherProps} ref={ref}>
      {isSingleSelectionMode ? (
        <VisuallyHidden>{checkboxProps['aria-label']}</VisuallyHidden>
      ) : (
        <Checkbox {...checkboxProps} />
      )}
    </Th>
  );
}
