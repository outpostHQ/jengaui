import { JengaDialogProps, Dialog } from './Dialog'
import { JengaDialogTriggerProps, DialogTrigger } from './DialogTrigger'
import { api } from './api'
import { JengaDialogContainerProps, DialogContainer } from './DialogContainer'
import {
  JengaDialogFormRef,
  JengaDialogFormProps,
  DialogForm,
} from './DialogForm'

const _Dialog = Object.assign(Dialog, {
  confirm: (options) => {
    return api.open({ dialogType: 'confirm', ...options })
  },
  info: (options) => {
    return api.open({ dialogType: 'info', ...options })
  },
  form: (options) => {
    return api.open({ dialogType: 'form', ...options })
  },
})

export { _Dialog as Dialog, DialogContainer, DialogTrigger, DialogForm }

export type {
  JengaDialogProps,
  JengaDialogTriggerProps,
  JengaDialogContainerProps,
  JengaDialogFormRef,
  JengaDialogFormProps,
}
