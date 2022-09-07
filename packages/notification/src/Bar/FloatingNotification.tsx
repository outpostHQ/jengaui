import { Key, KeyboardEventHandler, memo, useRef } from 'react';

import { useChainedCallback, useEvent, useTimer } from '@jenga-ui/hooks';
import { tasty } from 'tastycss';
import { JengaNotifyApiPropsWithID } from '../types';
import { NotificationView } from '../NotificationView';
import {
  NotificationItemNode,
  NotificationsListState,
  useNotificationListItem,
} from '../hooks';

export type FloatingNotificationProps = {
  id: Key;
  isDisabledTimer: boolean;
  onRemoveNotification: (id: Key) => void;
  onDismissNotification: (id: Key) => void;
  item: NotificationItemNode<JengaNotifyApiPropsWithID>;
  state: NotificationsListState<JengaNotifyApiPropsWithID>;
};

const NotificationContainer = tasty({
  styles: { boxShadow: '0 0.5x 2x #shadow', pointerEvents: 'auto' },
});

export const FloatingNotification = memo(function FloatingNotification(
  props: FloatingNotificationProps,
): JSX.Element {
  const {
    item,
    state,
    onRemoveNotification,
    id,
    isDisabledTimer,
    onDismissNotification,
  } = props;
  const { props: notificationProps, key } = item;

  const ref = useRef<HTMLDivElement | null>(null);
  const onCloseEvent = useChainedCallback(
    () => onRemoveNotification(id),
    notificationProps.onClose,
  );

  const chainedOnDismiss = useChainedCallback(
    () => onDismissNotification(id),
    () => onRemoveNotification(id),
    notificationProps.onDismiss,
  );

  const onKeyDown = useEvent<KeyboardEventHandler<HTMLElement>>(({ key }) => {
    if (notificationProps.isDismissible === false) {
      return;
    }

    const closeKeys = ['Delete', 'Backspace', 'Escape'];

    if (closeKeys.includes(key)) {
      chainedOnDismiss();
    }
  });

  const { itemProps } = useNotificationListItem({ key, ref, state });

  const { timer } = useTimer({
    callback: chainedOnDismiss,
    delay: notificationProps.duration,
    isDisabled: isDisabledTimer,
  });

  return (
    <NotificationContainer>
      <NotificationView
        ref={ref}
        {...notificationProps}
        timer={timer}
        attributes={{
          ...itemProps,
          onKeyDown,
          role: 'status',
          'aria-atomic': 'true',
        }}
        qa="FloatingNotification"
        onDismiss={chainedOnDismiss}
        onClose={onCloseEvent}
      />
    </NotificationContainer>
  );
});