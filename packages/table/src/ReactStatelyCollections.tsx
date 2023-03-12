import { ColumnProps, CellProps, RowProps } from '@react-stately/table';
import { BasePropsWithoutChildren, Styles } from 'tastycss';
import { Column as _Column } from '@react-stately/table';
import { Cell as _Cell } from '@react-stately/table';
import { Row as _Row } from '@react-stately/table';
import { TableBody as _TableBody } from '@react-stately/table';
import { TableHeader as _TableHeader } from '@react-stately/table';
import { HTMLProps } from 'react';
export const TableHeader = _TableHeader;
export const TableBody = _TableBody;
export const Row = _Row as (
  props: RowProps & {
    align?: 'left' | 'center' | 'right';
    styles?: Styles;
  } & BasePropsWithoutChildren &
    HTMLProps<HTMLTableRowElement>,
) => JSX.Element;
export const Column = _Column as <T>(
  props: ColumnProps<T> & {
    align?: 'left' | 'center' | 'right';
    dataType?: 'generic' | 'numeric' | 'date';
    colCellStyles?: Styles;
  } & BasePropsWithoutChildren &
    HTMLProps<HTMLTableCellElement>,
) => JSX.Element;

export const AligmentFromDTCatalog = {
  generic: 'left',
  numeric: 'right',
  date: 'right',
};

export const Cell = _Cell as (
  props: CellProps & BasePropsWithoutChildren & HTMLProps<HTMLTableCellElement>,
) => JSX.Element;
