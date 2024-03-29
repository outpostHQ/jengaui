import { ReactChild, ReactFragment, useMemo } from 'react';
import { isElement, isFragment } from 'react-is';

import { useNotificationsApi } from '@jengaui/notification';

import {
  JengaToastsApiToastAction,
  JengaToastsApiToastShortcuts,
} from './types';

import type { JengaToastsApiProps, JengaToastsApiToastCallback } from './types';

export function useToastsApi() {
  const { notify, update, remove } = useNotificationsApi();

  const toast: JengaToastsApiToastAction = useMemo(
    () =>
      Object.assign<JengaToastsApiToastCallback, JengaToastsApiToastShortcuts>(
        (props) =>
          notify({
            putNotificationInDropdownOnDismiss: false,
            ...unwrapProps(props),
          }),
        {
          success: (props) => toast({ type: 'success', ...unwrapProps(props) }),
          danger: (props) => toast({ type: 'danger', ...unwrapProps(props) }),
          attention: (props) =>
            toast({ type: 'attention', ...unwrapProps(props) }),
        },
      ),
    [],
  );

  return { toast, update, remove } as const;
}

function unwrapProps(props: JengaToastsApiProps | ReactChild | ReactFragment) {
  return {
    ...(propsIsToastProps(props)
      ? {
          isDismissible: props.duration !== null,
          duration: 5_000,
          ...props,
        }
      : { description: props, isDismissible: true, duration: 5_000 }),
  };
}

function propsIsToastProps(
  props: JengaToastsApiProps | ReactChild | ReactFragment,
): props is JengaToastsApiProps {
  const isReactNode =
    isElement(props) ||
    isFragment(props) ||
    typeof props === 'string' ||
    typeof props === 'number';

  return !isReactNode;
}
