import React, { memo } from 'react';
import { isElement } from 'react-is';
import flatten from 'react-keyed-flatten-children';
import { JengaNotificationProps, NotificationActionComponent } from '../types';
import { tasty } from 'tastycss';
import { ButtonGroup } from '@jenga-ui/button-group';

interface NotificationFooterProps {
  hasDescription: boolean;
  actions: JengaNotificationProps['actions'];
  onClose: () => void;
  onDismiss: () => void;
}

const FooterArea = tasty(ButtonGroup, {
  gridArea: 'footer',
  gap: '2x',
  styles: {
    '&:not(:empty)': {
      margin: { '': '0.5x top', 'has-description': '1x top' },
    },
  },
});

export const NotificationFooter = memo(function NotificationFooter(
  props: NotificationFooterProps,
): JSX.Element {
  const { actions, onClose, onDismiss, hasDescription } = props;

  return (
    <FooterArea mods={{ 'has-description': hasDescription }}>
      {flatten(
        typeof actions === 'function'
          ? actions({ onClose, onDismiss })
          : actions,
      )
        .filter((action) => isElement(action))
        .map((action, index) => {
          const { props } = action as NotificationActionComponent;
          const defaultType = index === 0 ? 'primary' : 'secondary';

          return React.cloneElement(
            action as NotificationActionComponent,
            {
              ...props,
              type: props.type ?? defaultType,
            },
            props.children,
          );
        })}
    </FooterArea>
  );
});
