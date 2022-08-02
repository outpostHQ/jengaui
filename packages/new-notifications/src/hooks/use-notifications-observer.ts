import { useContext, useEffect } from 'react';
import { useEvent } from '@jenga-ui/core';
import { JengaNotifyApiPropsWithID } from '../types';
import { NotificationsContext } from '../NotificationsContext/index';

export function useNotificationsObserver(
  callback: (notification: JengaNotifyApiPropsWithID) => void,
) {
  const { addOnDismissListener } = useContext(NotificationsContext) ?? {};
  const callbackEvent = useEvent(callback);

  useEffect(
    () => addOnDismissListener?.(callbackEvent),
    [addOnDismissListener],
  );
}
