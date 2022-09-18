import { Key, ReactChild, ReactElement, ReactFragment, ReactNode } from 'react';

import {
  NotificationAction,
  NotificationActionProps,
} from './NotificationView';

export type JengaNotificationType = 'success' | 'danger' | 'attention';
export type NotificationActionComponent = ReactElement<
  NotificationActionProps,
  typeof NotificationAction
>;

type NotificationActionType =
  | NotificationActionComponent
  | [NotificationActionComponent]
  | [NotificationActionComponent, NotificationActionComponent];

type NotificationActionCallbackArg = {
  onClose: () => void;
  onDismiss: () => void;
};

export type BaseNotificationProps = {
  /**
   * @default 'attention'
   */
  type?: JengaNotificationType;
  /**
   * The delay before the notification hides (in milliseconds) If set to `null`, it will never dismiss.
   *
   * @default 5000
   */
  duration?: number | null;
  /**
   * ID of the notification. Mostly used when you need to prevent duplicate. By default, we generate a unique id for each notification
   */
  id?: Key;
  /**
   * If true, notification will have the close button.
   * @default true
   */
  isDismissible?: boolean;
  /**
   * Callback fires when a notificaiton is dismissed either by clicking the close button or the timeout.
   */
  onDismiss?: () => void;
  /**
   * Callback fires when a notificaiton is closed by interacting with the notification (via actions)
   */
  onClose?: () => void;
  /**
   * When set to false, notification will not appear in `<NotificaitonsDialog />` when dismissed
   * @default true
   */
  putNotificationInDropdownOnDismiss?: boolean;
  /**
   * Title of the notification
   */
  header?: ReactChild | ReactFragment;
  description: ReactChild | ReactFragment;
  /**
   * Custom Icon for the notification
   */
  icon?: ReactNode;
  /**
   * Custom Actions in the notification
   */
  actions?:
    | ((arg: NotificationActionCallbackArg) => NotificationActionType)
    | NotificationActionType;
};

export type JengaNotificationProps = BaseNotificationProps;

export type JengaNotifyApiProps = {
  meta?: JengaNotificationMeta;
} & JengaNotificationProps;

export type JengaNotifyApiPropsWithID = {
  id: NonNullable<JengaNotificationProps['id']>;
} & JengaNotifyApiProps;

export type JengaNotificationsApiNotifyCallback = (
  props: JengaNotifyApiProps,
) => {
  id: Key;
  update: (props: Partial<JengaNotifyApiProps>) => void;
  remove: () => void;
};

export type JengaNotificationsApiNotifyAction =
  JengaNotificationsApiNotifyCallback &
    Record<JengaNotificationType, JengaNotificationsApiNotifyCallback>;

export type JengaNotificationsApi = {
  notify: JengaNotificationsApiNotifyAction;
  update: (id: Key, props: Partial<JengaNotifyApiProps>) => void;
  remove: (id: Key) => void;
};

export type JengaNotificationMeta = Record<string, unknown>;
