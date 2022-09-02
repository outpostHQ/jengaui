import { createContext, PropsWithChildren, RefObject, useMemo } from 'react';

import { Portal } from '../../../portal';
import { NotificationsBar } from '../Bar';
import { JengaNotificationsApi, JengaNotifyApiPropsWithID } from '../types';

import { useNotifications } from './use-notifications';

export const NotificationsContext = createContext<{
  api: JengaNotificationsApi;
  addOnDismissListener: (
    listener: (notification: JengaNotifyApiPropsWithID) => void,
  ) => () => void;
} | null>(null);

export function NotificationsProvider(
  props: PropsWithChildren<{ rootRef: RefObject<HTMLElement | null> | null }>,
): JSX.Element {
  const { children, rootRef } = props;

  const { toasts, api, addOnDismissListener, onDismissNotification } =
    useNotifications(rootRef);

  const providerValue = useMemo(() => ({ api, addOnDismissListener }), []);

  return (
    <NotificationsContext.Provider value={providerValue}>
      <Portal>
        <NotificationsBar
          items={toasts}
          onRemoveNotification={api.remove}
          onDismissNotification={onDismissNotification}
        >
          {(notification) => (
            <NotificationsBar.Item key={notification.id} {...notification} />
          )}
        </NotificationsBar>
      </Portal>

      {children}
    </NotificationsContext.Provider>
  );
}