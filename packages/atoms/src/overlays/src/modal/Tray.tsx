import { useDOMRef } from '@react-spectrum/utils'
import { useViewportSize } from '@react-aria/utils'
import { Overlay } from './Overlay'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Underlay } from './Underlay'
import { useModal, useOverlay, usePreventScroll } from '@react-aria/overlays'
import { OVERLAY_WRAPPER_STYLES } from './Modal'
import {
  Element,
  BaseProps,
  Props,
  Styles,
  useContextStyles,
} from 'tastycss-react'
import { mergeProps } from '@jenga-ui/core'
import { TrayProps } from '@react-types/overlays'

const TRAY_STYLES: Styles = {
  zIndex: 2,
  height: 'max (@cube-visual-viewport-height * .9)',
  width: '288px 90vw',
  pointerEvents: 'auto',
  transition:
    'transform .25s ease-in-out, opacity .25s linear, visibility 0ms linear',
  opacity: {
    '': 0,
    open: '.9999',
  },
}

export interface JengaTrayProps extends TrayProps {
  qa?: BaseProps['qa']
  onClose?: () => void
  isFixedHeight?: boolean
  isNonModal?: boolean
  styles?: Styles
}

interface JengaTrayWrapperProps extends JengaTrayProps {
  isOpen?: boolean
  overlayProps?: Props
}

function Tray(props: JengaTrayProps, ref) {
  const {
    qa,
    children,
    onClose,
    isFixedHeight,
    isNonModal,
    styles,
    ...otherProps
  } = props
  const domRef = useDOMRef(ref)

  const { overlayProps, underlayProps } = useOverlay(
    { ...props, isDismissable: true },
    domRef
  )

  return (
    <Overlay {...otherProps}>
      <Underlay {...underlayProps} />
      <TrayWrapper
        qa={qa}
        onClose={onClose}
        ref={domRef}
        overlayProps={overlayProps}
        isFixedHeight={isFixedHeight}
        isNonModal={isNonModal}
        styles={styles}
      >
        {children}
      </TrayWrapper>
    </Overlay>
  )
}

const TrayWrapper = forwardRef(function (props: JengaTrayWrapperProps, ref) {
  const {
    qa,
    children,
    isOpen,
    isFixedHeight,
    isNonModal,
    overlayProps,
    ...otherProps
  } = props

  let { styles } = props

  usePreventScroll()

  const { modalProps } = useModal({
    isDisabled: isNonModal,
  })

  styles = {
    ...TRAY_STYLES,
    ...useContextStyles('Tray', props),
    ...styles,
  }

  // We need to measure the window's height in JS rather than using percentages in CSS
  // so that contents (e.g. menu) can inherit the max-height properly. Using percentages
  // does not work properly because there is nothing to base the percentage on.
  // We cannot use vh units because mobile browsers adjust the window height dynamically
  // when the address bar/bottom toolbars show and hide on scroll and vh units are fixed.
  // Also, the visual viewport is smaller than the layout viewport when the virtual keyboard
  // is up, so use the VisualViewport API to ensure the tray is displayed above the keyboard.
  const viewport = useViewportSize()
  const [height, setHeight] = useState(viewport.height)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // When the height is decreasing, and the keyboard is visible
    // (visual viewport smaller than layout viewport), delay setting
    // the new max height until after the animation is complete
    // so that there isn't an empty space under the tray briefly.
    if (viewport.height < height && viewport.height < window.innerHeight) {
      timeoutRef.current = setTimeout(() => {
        setHeight(viewport.height)
      }, 500)
    } else {
      setHeight(viewport.height)
    }
  }, [height, viewport.height])

  const wrapperStyle = {
    '--cube-visual-viewport-height': height + 'px',
  }

  const domProps = mergeProps(otherProps, overlayProps)

  return (
    <Element
      qa="TrayWrapper"
      mods={{
        open: isOpen,
      }}
      styles={{
        ...OVERLAY_WRAPPER_STYLES,
        placeContent: 'end center',
        placeItems: 'end center',
      }}
      style={wrapperStyle}
    >
      <Element
        qa={qa || 'Tray'}
        styles={styles}
        mods={{
          open: isOpen,
          'fixed-height': isFixedHeight,
        }}
        {...domProps}
        {...modalProps}
        ref={ref}
      >
        {children}
      </Element>
    </Element>
  )
})

TrayWrapper.displayName = 'TrayWrapper'

const _Tray = forwardRef(Tray)
export { _Tray as Tray }
