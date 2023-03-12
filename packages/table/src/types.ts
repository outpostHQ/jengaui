import { TableState, TableStateProps } from '@react-stately/table';
import { GridNode } from '@react-types/grid';
import { BaseProps, BasePropsWithoutChildren, Styles } from 'tastycss';
import { Node } from '@react-types/shared';
import { AriaTableProps } from '@react-aria/table';
import { JengaCheckboxProps } from '@jengaui/checkbox';
import { HTMLProps, ReactNode } from 'react';

export type JengaTableElementBaseProps<T> = {
  item: Node<unknown>;
  state: TableState<T>;
} & BaseProps;

export type JengaTableCellProps<T> = HTMLProps<HTMLTableCellElement> &
  JengaTableElementBaseProps<T>;

export type JengaTableCheckboxCellProps<T> = JengaTableElementBaseProps<T>;

export type JengaTableColumnHeaderProps<T> = HTMLProps<HTMLTableCellElement> &
  Omit<JengaTableElementBaseProps<T>, 'item'> & {
    item: GridNode<unknown>;
  } & BaseProps;

export type JengaTableExtendedProps = {
  wrapperStyles?: Styles;
  wrapperProps?: BasePropsWithoutChildren;
  tableBodyStyles?: Styles;
  tableBodyProps?: HTMLProps<HTMLTableSectionElement> &
    BasePropsWithoutChildren;
  footerStyles?: Styles;
  headerStyles?: HTMLProps<HTMLTableSectionElement> & Styles;
  headerRowProps?: HTMLProps<HTMLTableRowElement> & BaseProps;
  headerRowStyles?: Styles;
  footerProps?: BasePropsWithoutChildren;
  headerProps?: BasePropsWithoutChildren;
  checkboxProps?: JengaCheckboxProps;
  checkboxStyles?: Styles;
  selectionMode?: 'multiple' | 'single' | 'none';
  selectionBehavior?: 'replace' | 'toggle';
  cellPadding?:
    | 'dense'
    | 'regular'
    | 'spaceous'
    | string
    | string[]
    | Array<'dense' | 'regular' | 'spaceous'>;
  stickyHeader?: boolean;
  zebraStripes?: boolean;
  setKeyboardNavigationDisabled?: boolean;
  alternateBody?: ReactNode;
  showAlternateBody?: boolean;
  showFooter?: boolean;
  customHeaderRowPostion?: 'top' | 'bottom';
  customFooter?: ReactNode;
  customHeaderRow?: ReactNode;
  onEmpty?: ReactNode;
  cellStyles?: Styles;
  cellProps?: HTMLProps<HTMLTableCellElement> & BasePropsWithoutChildren;
  rowProps?: HTMLProps<HTMLTableRowElement> & BasePropsWithoutChildren;
  rowStyles?: Styles;
};
export type JengaTableProps<T> = AriaTableProps<T> &
  TableStateProps<T> &
  BasePropsWithoutChildren &
  JengaTableExtendedProps;

export type JengaTableBaseProps<T> = Omit<TableStateProps<T>, 'children'> &
  BaseProps & {
    cellPadding?: string | string[];
    zebraStripes?: boolean;
    checkboxProps?: JengaCheckboxProps;
    checkboxStyles?: Styles;
    cellStyles?: Styles;
    cellProps?: BasePropsWithoutChildren;
    rowProps?: BasePropsWithoutChildren;
    rowStyles?: Styles;
  };

export type JengaTableHeadProps<T> = BaseProps & {
  state: TableState<T>;
  stickyHeader?: boolean;
  headerRowProps?: HTMLProps<HTMLTableRowElement> & BasePropsWithoutChildren;
  customHeaderPosition: 'top' | 'bottom';
};

export type JengaTableBodyProps<T> = BaseProps & {
  state: TableState<T>;
} & {
  alternateBody?: ReactNode;
  showAlternateBody?: boolean;
  onEmpty?: ReactNode;
};
