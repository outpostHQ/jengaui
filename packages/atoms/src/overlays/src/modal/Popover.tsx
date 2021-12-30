import { mergeProps } from '@react-aria/utils'
import { Overlay } from './Overlay'
import React, { forwardRef, HTMLAttributes, RefObject } from 'react'
import { useModal, useOverlay } from '@react-aria/overlays'
import { Element, useContextStyles, BaseProps, Styles } from 'tastycss-react'
import { OverlayProps } from '@react-types/overlays'
import { PlacementAxis } from '@jenga-ui/core'

const POPOVER_STYLES: Styles = {
  pointerEvents: 'auto',
  position: 'absolute',
  transition:
    'opacity .120s linear, visibility 0ms linear, transform .120s ease-in-out',
  transform: {
    '': 'scale(1, .9)',
    open: 'scale(1, 1)',
  },
  opacity: {
    '': 0,
    open: '.9999',
  },
  transformOrigin: {
    '': 'top center',
    '[data-placement="top"]': 'bottom center',
  },
}

export interface JengaPopoverProps
  extends BaseProps,
    Omit<OverlayProps, 'children'> {
  placement?: PlacementAxis
  arrowProps?: HTMLAttributes<HTMLElement>
  hideArrow?: boolean
  isOpen?: boolean
  onClose?: () => void
  shouldCloseOnBlur?: boolean
  isNonModal?: boolean
  isDismissable?: boolean
}

function Popover(props: JengaPopoverProps, ref) {
  const {
    qa,
    style,
    styles,
    children,
    placement,
    arrowProps,
    onClose,
    shouldCloseOnBlur,
    isKeyboardDismissDisabled,
    isNonModal,
    isDismissable = true,
    ...otherProps
  } = props

  return (
    <Overlay {...otherProps}>
      <PopoverWrapper
        qa={qa}
        ref={ref}
        style={style}
        styles={styles}
        placement={placement}
        arrowProps={arrowProps}
        onClose={onClose}
        shouldCloseOnBlur={shouldCloseOnBlur}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        isNonModal={isNonModal}
        isDismissable={isDismissable}
      >
        {children}
      </PopoverWrapper>
    </Overlay>
  )
}

const PopoverWrapper = forwardRef((props: JengaPopoverProps, ref: any) => {
  const {
    qa,
    children,
    placement = 'bottom',
    arrowProps,
    isOpen,
    style,

    shouldCloseOnBlur,
    isKeyboardDismissDisabled,
    isNonModal,
    isDismissable,
    ...otherProps
  } = props
  let { styles } = props

  const { overlayProps } = useOverlay(
    { ...props, isDismissable: isDismissable && isOpen },
    ref
  )
  const { modalProps } = useModal({
    isDisabled: isNonModal,
  })

  styles = {
    ...POPOVER_STYLES,
    ...useContextStyles('Popover', props),
    ...styles,
  }

  return (
    <Element
      qa={qa || 'Popover'}
      {...mergeProps(otherProps, overlayProps, modalProps)}
      styles={styles}
      ref={ref}
      mods={{
        open: isOpen,
      }}
      data-placement={placement}
      role="presentation"
      style={style}
    >
      {children}
    </Element>
  )
})

PopoverWrapper.displayName = 'PopoverWrapper'

const _Popover = forwardRef(Popover)
export { _Popover as Popover }
