import { Key, useEffect } from 'react';

import { useEvent, useSyncRef } from '@jenga-ui/hooks';
import { useId } from '@jenga-ui/utils';

import { useNotificationsApi } from './hooks';
import { JengaNotifyApiProps } from './types';

export type NotificationProps = {
  /**
   * If set to true, when the component gets unmounted, notifications will not be removed from the bar
   *
   * @default false
   */
  disableRemoveOnUnmount?: boolean;
} & JengaNotifyApiProps;

export function Notification(props: NotificationProps) {
  const { id: propsId, disableRemoveOnUnmount = false } = props;

  const defaultId = useId();
  const disableRemoveOnUnmountRef = useSyncRef(disableRemoveOnUnmount);
  const { notify, update, remove } = useNotificationsApi();

  const id = propsId ?? defaultId;

  const removeNotification = useEvent((id: Key) =>
    disableRemoveOnUnmountRef.current ? void 0 : remove(id),
  );

  useEffect(() => {
    notify({ id, ...props });
  }, [id]);
  useEffect(() => () => removeNotification(id), [id]);
  useEffect(() => update(id, props));

  return null;
}

Notification.Success = function NotificationSuccess(props: NotificationProps) {
  return <Notification type="success" {...props} />;
};

Notification.Danger = function NotificationDanger(props: NotificationProps) {
  return <Notification type="danger" {...props} />;
};

Notification.Attention = function NotificationAttention(
  props: NotificationProps,
) {
  return <Notification type="attention" {...props} />;
};