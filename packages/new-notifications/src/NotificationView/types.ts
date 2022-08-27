import type { ReactNode, HTMLAttributes } from 'react';
import type { JengaNotificationType } from '../types';
import { Styles } from 'tastycss';
import { Timer } from '@jenga-ui/hooks';
import { BaseNotificationProps } from '../types';

export type NotificationProps = {
  qa?: string;
  attributes?: HTMLAttributes<HTMLDivElement>;
  styles?: Styles;
  timer?: Timer | null;
  onClose?: () => void;
} & BaseNotificationProps;

export type NotificationIconProps = {
  type: JengaNotificationType;
  icon?: ReactNode;
};
