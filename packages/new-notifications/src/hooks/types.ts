import type { ListState } from '@react-stately/list';
import type { Collection, CollectionElement, Node } from '@react-types/shared';
import type { JengaNotificationProps } from '../types';

export type CollectionChildren<T, R = T> =
  | CollectionElement<R>
  | CollectionElement<R>[]
  | ((item: T) => CollectionElement<R>);

export type NotificationItemNode<T> = Omit<
  Node<JengaNotificationProps>,
  'props'
> & { props: T };

export type NotificationsListState<T> = Omit<ListState<T>, 'collection'> & {
  collection: Collection<NotificationItemNode<T>>;
};