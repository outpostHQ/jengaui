import { TableState } from '@react-stately/table';
import { GridNode } from '@react-types/grid';
import { ReactNode } from 'react';
import { BaseProps, BasePropsWithoutChildren } from 'tastycss';
import { Node } from '@react-types/shared';

export type JengaTableElementBaseProps = BaseProps & {
  item: Node<unknown>;
  state: TableState<unknown>;
};

export type JengaTableColumnHeaderProps = Omit<
  JengaTableElementBaseProps,
  'item'
> & { item: GridNode<unknown> };
