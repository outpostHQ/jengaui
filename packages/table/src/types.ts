import { TableState, TableStateProps } from '@react-stately/table';
import { GridNode } from '@react-types/grid';
import { BaseProps, Styles } from 'tastycss';
import { Node } from '@react-types/shared';
import { AriaTableProps } from '@react-aria/table';
import { JengaCheckboxProps } from '@jenga-ui/checkbox';
import { ReactNode } from 'react';

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
    footerStyles?: Styles;
    headerStyles?: Styles;
    checkboxAdditionalProps?: JengaCheckboxProps;
    checkboxStyles?: Styles;
    selectionMode?: 'multiple' | 'single' | 'none';
    selectionBehavior?: 'replace' | 'toggle';
    cellPadding?: string | string[];
    stickyHeader?: boolean;
    zebraStripes?: boolean;
    stickyFirstCol?: boolean;
    setKeyboardNavigationDisabled?: boolean;
    IsEmpty?: ReactNode;
    paginated?: boolean;
    showFooter?: boolean;
    recordsPerPage?: number;
    showPage?: number;
  };

export type JengaTableBaseProps = BaseProps &
  TableStateProps<HTMLTableElement> & {
    cellPadding?: string | string[];
    paginated?: boolean;
    zebraStripes?: boolean;
    currentlyVisibleRange?: [number, number];
    checkboxAdditionalProps?: JengaCheckboxProps;
    checkboxStyles?: Styles;
    currentPage?: number;
    totalPages?: number;
    recordsPerPage?: number;
  };

export type JengaTableHeadProps = BaseProps & {
  state: TableState<unknown>;
  stickyHeader?: boolean;
};

export type JengaTableBodyProps = Omit<JengaTableHeadProps, 'stickyHeader'> & {
  IsEmpty?: ReactNode;
};
