import { useContext, useEffect } from 'react';

import { useEvent } from '@jengaui/hooks';
import { JengaNotifyApiPropsWithID } from '../types';
import { NotificationsContext } from '../NotificationsContext';

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
