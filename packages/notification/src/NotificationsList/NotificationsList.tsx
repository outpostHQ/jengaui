import { useRef } from 'react';
import { Item } from '@react-stately/collections';

import { tasty } from 'tastycss';
import { useNotificationsList } from '../hooks';

import { NotificationListItem } from './NotificationsListItem';

import type { JengaNotificationProps } from '../types';
import type { NotificationsListProps } from './types';

const NotificationListContainer = tasty({
  styles: { boxSizing: 'border-box', width: '100%' },
});

/**
 * Provides ability to show notifications as a list.
 *
 * @example
 *   <NotificationsList>
 *     <NotificationsList.Item key="id_1" type="success" description="Edit and test your schema without affecting the production." />
 *     <NotificationsList.Item key="id_2" type="attention" description="Edit and test your schema without affecting the production." />
 *     <NotificationsList.Item key="id_3" type="danger" description="Edit and test your schema without affecting the production." />
 *   </NotificationsList>
 *
 * @example Removing a notification
 *   <NotificationsList onDismiss={(id) => removeNotification(id)}>
 *     <NotificationsList.Item key="id_1" type="success" description="Edit and test your schema without affecting the production." />
 *   </NotificationsList>
 */
export function NotificationsList<T extends object>(
  props: NotificationsListProps<T>,
): JSX.Element {
  const { items, children, onDismiss } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const { state, listProps } = useNotificationsList({
    items,
    children,
    ref,
  });

  return (
    <NotificationListContainer ref={ref} {...listProps}>
      {[...state.collection].map((item) => (
        <NotificationListItem
          key={item.key}
          item={item}
          state={state}
          onDismiss={onDismiss}
        />
      ))}
    </NotificationListContainer>
  );
}

NotificationsList.Item = Item as unknown as (
  props: Omit<JengaNotificationProps, 'onDismiss'>,
) => null;