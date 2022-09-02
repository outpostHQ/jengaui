import { useRef } from 'react';
import { Item } from '@react-stately/collections';
import { CollectionElement } from '@react-types/shared';

import { tasty } from 'tastycss';

import { NotificationView } from './NotificationView';
import {
  CollectionChildren,
  NotificationItemNode,
  NotificationsListState,
  useNotificationListItem,
  useNotificationsList,
} from './hooks';

import type { JengaNotificationProps } from './types';

export type NotificationsListProps<T> = {
  items?: T[] | readonly T[];
  children: CollectionChildren<T>;
} & (NotificationsListFactory<T> | NotificationsListStatic);

export type NotificationsListFactory<T> = {
  items: T[] | readonly T[];
  children: (item: T) => CollectionElement<JengaNotificationProps>;
};

export type NotificationsListStatic = {
  items?: 'You must either use factory or static children';
  children:
    | CollectionElement<JengaNotificationProps>
    | CollectionElement<JengaNotificationProps>[];
};

const NotificationListContainer = tasty({
  styles: { boxSizing: 'border-box', width: '100%' },
});

export function NotificationsList<T extends object>(
  props: NotificationsListProps<T>,
): JSX.Element {
  const { items, children } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const { state, listProps } = useNotificationsList({
    items,
    children,
    ref,
  });

  return (
    <NotificationListContainer ref={ref} {...listProps}>
      {[...state.collection].map((item) => (
        <NotificationListItem key={item.key} item={item} state={state} />
      ))}
    </NotificationListContainer>
  );
}

NotificationsList.Item = Item as unknown as (
  props: JengaNotificationProps,
) => null;

type NotificationListItemProps = {
  item: NotificationItemNode<JengaNotificationProps>;
  state: NotificationsListState<JengaNotificationProps>;
};

const NotificationListItemWrap = tasty({
  styles: { borderBottom: { '': '1bw solid #border', ':last-child': 'none' } },
});

function NotificationListItem(props: NotificationListItemProps) {
  const { item, state } = props;
  const { key, props: notificationProps } = item;

  const ref = useRef<HTMLDivElement>(null);

  const { itemProps } = useNotificationListItem({ ref, key, state });

  return (
    <NotificationListItemWrap>
      <NotificationView
        ref={ref}
        attributes={itemProps}
        {...notificationProps}
        isDismissible={false}
      />
    </NotificationListItemWrap>
  );
}