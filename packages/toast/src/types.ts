import type { Key, ReactChild, ReactFragment, ReactNode } from 'react';
import type {
  JengaNotificationType,
  JengaNotifyApiProps,
} from '@jenga-ui/new-notifications';

export type JengaToastsApiProps = {
  description: ReactChild | ReactFragment;
  header?: ReactChild | ReactFragment;
  id?: Key;
  onDismiss?: () => void;
  duration?: number | null;
  icon?: ReactNode;
  type?: JengaNotificationType;
};

export type JengaToastsApi = {
  toast: JengaToastsApiToastAction;
  update: (id: Key, props: Partial<JengaToastsApiProps>) => void;
  remove: (id: Key) => void;
};

export type JengaToastsApiToastCallback = (
  props: JengaToastsApiProps | ReactChild | ReactFragment,
) => {
  id: Key;
  update: (props: Partial<JengaNotifyApiProps>) => void;
  remove: () => void;
};

export type JengaToastsApiToastShortcuts = Record<
  JengaNotificationType,
  JengaToastsApiToastCallback
>;

export type JengaToastsApiToastAction = JengaToastsApiToastCallback &
  JengaToastsApiToastShortcuts;
