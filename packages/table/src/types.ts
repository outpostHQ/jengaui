import { TableState, TableStateProps } from '@react-stately/table';
import { GridNode } from '@react-types/grid';
import { BaseProps } from 'tastycss';
import { Node } from '@react-types/shared';
import { AriaTableProps } from '@react-aria/table';

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
    checkboxPosition?: string;
    selectionMode?: 'multiple' | 'single' | 'none';
    selectionBehavior?: 'replace' | 'toggle';
    cellPadding?: string;
    stickyHeader?: boolean;
  };

export type JengaPaginatedTableProps = JengaTableProps & {
  recordsPerPage?: number;
  defaultPage?: number;
  showPage?: number;
  totalPages?: number;
};

export type JengaTableHeadProps = BaseProps & {
  state: TableState<unknown>;
  cellPadding: string | string[];
  stickyHeader: boolean;
};

export type JengaTableBodyProps = Omit<JengaTableHeadProps, 'stickyHeader'> & {
  currentShow?: [number, number];
};
