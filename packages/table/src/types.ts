import { TableState, TableStateProps } from '@react-stately/table';
import { GridNode } from '@react-types/grid';
import { BaseProps, BasePropsWithoutChildren, Styles } from 'tastycss';
import { AriaTableProps } from '@react-aria/table';
import { JengaCheckboxProps } from '@jengaui/checkbox';
import { HTMLProps } from 'react';

export type JengaTableElementBaseProps<T> = {
  item: GridNode<T>;
  state: TableState<T>;
} & BaseProps;

export type JengaTableCellProps<T> = HTMLProps<HTMLTableCellElement> &
  JengaTableElementBaseProps<T>;

export type JengaTableCheckboxCellProps<T> = JengaTableElementBaseProps<T>;

export type JengaTableColumnHeaderProps<T> = HTMLProps<HTMLTableCellElement> &
  JengaTableElementBaseProps<T> &
  BaseProps;

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
  alternateBody?: JSX.Element;
  showAlternateBody?: boolean;
  showFooter?: boolean;
  customHeaderRowPostion?: 'top' | 'bottom';
  customFooter?: JSX.Element;
  customHeaderRow?: JSX.Element;
  onEmpty?: JSX.Element;
  cellStyles?: Styles;
  cellProps?: HTMLProps<HTMLTableCellElement> & BasePropsWithoutChildren;
  rowProps?: HTMLProps<HTMLTableRowElement> & BasePropsWithoutChildren;
  rowStyles?: Styles;
};
export type JengaTableProps<T> = AriaTableProps<T> &
  TableStateProps<T> &
  BasePropsWithoutChildren &
  JengaTableExtendedProps;

export type JengaTableBaseProps<T> = TableStateProps<T> &
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
  alternateBody?: JSX.Element;
  showAlternateBody?: boolean;
  onEmpty?: JSX.Element;
};
