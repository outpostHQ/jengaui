import { Key } from 'react';
import { CollectionElement } from '@react-types/shared';

import {
  CollectionChildren,
  NotificationItemNode,
  NotificationsListState,
} from '../hooks';
import { JengaNotificationProps } from '../types';

export type NotificationsListProps<T> = {
  onDismiss?: (id: Key) => void;
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

export type NotificationListItemProps = {
  onDismiss?: NotificationsListProps<unknown>['onDismiss'];
  item: NotificationItemNode<JengaNotificationProps>;
  state: NotificationsListState<JengaNotificationProps>;
};
