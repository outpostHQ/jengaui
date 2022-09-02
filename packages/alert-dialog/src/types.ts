import { AriaDialogProps } from '@react-types/dialog';
import { ReactNode } from 'react';

import {
  BaseProps,
  BaseStyleProps,
  BlockStyleProps,
  DimensionStyleProps,
} from 'tastycss';
import { JengaDialogContainerProps } from '@jenga-ui/dialog';

import { JengaAlertDialogProps } from './AlertDialog';

export interface Dialog {
  props: DialogProps;
  meta: AlertDialogMeta;
}

export interface DialogProps
  extends Omit<JengaDialogContainerProps, 'onDismiss' | 'children'>,
    Omit<JengaAlertDialogProps, 'type' | 'id' | 'content'> {
  content: ReactNode | (({ resolve, reject }) => ReactNode);
}

export type AlertDialogResolveStatus = 'confirm' | 'cancel' | 'secondary';

interface AlertDialogMeta {
  id: number;
  isClosed: boolean;
  promise: Promise<AlertDialogResolveStatus>;
  placement: 'top' | 'bottom';
  resolve: (status: AlertDialogResolveStatus) => void;
  reject: (reason) => void;
  isVisible?: boolean;
  dialogType?: 'info' | 'confirm' | 'form';
}

export interface JengaDialogProps
  extends Omit<BaseProps, 'role'>,
    AriaDialogProps,
    BaseStyleProps,
    BlockStyleProps,
    DimensionStyleProps {
  /** The type of the dialog. It affects its size and position. */
  type?:
    | 'modal'
    | 'popover'
    | 'fullscreen'
    | 'fullscreenTakeover'
    | 'panel'
    | 'tray';
  /** The size of the dialog */
  size?: 'S' | 'M' | 'L';
  /** Whether the dialog is dismissable */
  isDismissable?: boolean;
  /** Trigger when the dialog is dismissed */
  onDismiss?: (arg?: any) => void;
  /** That you can replace the close icon with */
  closeIcon?: ReactNode;
}