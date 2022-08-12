import { TableState, TableStateProps } from '@react-stately/table';
import { GridNode } from '@react-types/grid';
import { BaseProps, Styles } from 'tastycss';
import { Node } from '@react-types/shared';
import { AriaTableProps } from '@react-aria/table';
import { JengaCheckboxProps } from '@jenga-ui/checkbox';

export type JengaTableElementBaseProps = BaseProps & {
  item: Node<unknown>;
  state: TableState<unknown>;
};

export type JengaTableColumnHeaderProps = Omit<
  JengaTableElementBaseProps,
  'item'
> & { item: GridNode<unknown> };

export type JengaTableProps = AriaTableProps<HTMLTableElement> &
  BaseProps &
  TableStateProps<HTMLTableElement> & {
    tableStyles?: Styles;
    bodyStyles?: Styles;
    headerStyles?: Styles;
    checkboxAdditionalProps?: JengaCheckboxProps;
    checkboxStyles?: Styles;
    checkboxPosition?: string;
    selectionMode?: 'multiple' | 'single' | 'none';
    selectionBehavior?: 'replace' | 'toggle';
    cellPadding?: string | string[];
    stickyHeader?: boolean;
    zebraStripes?: boolean;
    stickyFirstCol?: boolean;
    setKeyboardNavigationDisabled?: boolean;
  };
export type JengaTableBaseProps = BaseProps &
  TableStateProps<HTMLTableElement> & {
    cellPadding: string | string[];
    paginated: boolean;
    zebraStripes: boolean;
    currentlyVisibleRange?: [number, number];
    bodyStyles?: Styles;
    checkboxAdditionalProps: JengaCheckboxProps;
    checkboxStyles: Styles;
    checkboxPosition: string;
  };

export type JengaPaginatedTableProps = JengaTableProps & {
  recordsPerPage?: number;
  defaultPage?: number;
  showPage?: number;
  totalPages?: number;
};

export type JengaTableHeadProps = BaseProps & {
  state: TableState<unknown>;
  stickyHeader: boolean;
};

export type JengaTableBodyProps = Omit<JengaTableHeadProps, 'stickyHeader'>;
