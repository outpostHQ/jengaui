import { useEffect } from 'react';
import { useId } from '@react-aria/utils';
import { useToastsApi } from './use-toasts-api';
import { JengaToastsApiProps } from './types';
import { JengaNotifyApiProps } from '@jenga-ui/new-notifications';

export function Toast(props: JengaToastsApiProps) {
  const { id: propsId } = props;
  const { toast, update, remove } = useToastsApi();
  const defaultId = useId();

  const id = propsId ?? defaultId;

  useEffect(() => {
    toast({ ...props, id });

    return () => remove(id);
  }, [id]);

  useEffect(() => {
    update(id, props as JengaNotifyApiProps);
  });

  return null;
}

Toast.Success = function ToastSuccess(props: JengaToastsApiProps) {
  return <Toast type="success" {...props} />;
};

Toast.Danger = function ToastDanger(props: JengaToastsApiProps) {
  return <Toast type="danger" {...props} />;
};

Toast.Attention = function ToastAttention(props: JengaToastsApiProps) {
  return <Toast type="attention" {...props} />;
};
