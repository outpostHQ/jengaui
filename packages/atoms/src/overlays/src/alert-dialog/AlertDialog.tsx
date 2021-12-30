import React, { forwardRef, useContext } from 'react'
import { chain } from '@react-aria/utils'
import { Button, ButtonProps } from '@jenga-ui/button'
import { Content } from '@jenga-ui/content'
import { JengaDialogProps, Dialog } from '../dialog'
import { DialogContext } from '../dialog/context'
import { Divider } from '@jenga-ui/content'
import { Title } from '@jenga-ui/content'
import { ButtonGroup } from '@jenga-ui/button-group'

export interface JengaAlertDialogProps extends JengaDialogProps {
  /** Whether the dialog is an important prompt */
  danger?: boolean
  primaryProps?: ButtonProps
  secondaryProps?: ButtonProps
  cancelProps?: ButtonProps
  title?: string
  noActions?: boolean
}

/**
 * AlertDialogs are a specific type of Dialog. They display important information that users need to acknowledge.
 */
function AlertDialog(props: JengaAlertDialogProps, ref) {
  const { onClose = () => {} } = useContext(DialogContext) || {}

  const {
    danger,
    children,
    primaryProps = {},
    secondaryProps,
    cancelProps,
    title,
    styles,
    noActions,
    ...otherProps
  } = props

  if (!primaryProps.label) {
    primaryProps.label = 'Ok'
  }

  let confirmType: ButtonProps['type'] = 'primary'

  if (danger) {
    confirmType = 'danger'
  }

  return (
    <Dialog role="alertdialog" ref={ref} isDismissable={false} {...otherProps}>
      <Title>{title}</Title>
      <Divider />
      <Content>{children}</Content>
      {!noActions ? (
        <ButtonGroup align="end">
          <Button
            type={confirmType}
            {...primaryProps}
            onPress={(e) =>
              chain(
                primaryProps.onPress && primaryProps.onPress(e),
                onClose('primary')
              )
            }
          />
          {secondaryProps && (
            <Button
              {...secondaryProps}
              onPress={(e) =>
                chain(
                  secondaryProps?.onPress && secondaryProps?.onPress(e),
                  onClose('secondary')
                )
              }
            />
          )}
          {cancelProps && (
            <Button
              {...cancelProps}
              onPress={(e) =>
                chain(
                  cancelProps?.onPress && cancelProps?.onPress(e),
                  onClose('cancel')
                )
              }
            />
          )}
        </ButtonGroup>
      ) : null}
    </Dialog>
  )
}

/**
 * AlertDialogs are a specific type of Dialog. They display important information that users need to acknowledge.
 */
const _AlertDialog = forwardRef(AlertDialog)
export { _AlertDialog as AlertDialog }
