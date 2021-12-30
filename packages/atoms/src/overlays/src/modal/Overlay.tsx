import { OpenTransition } from './OpenTransition'
import React, { forwardRef, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { Provider, useProviderProps } from '@jenga-ui/core'
import { OverlayProps } from '@react-types/overlays'
import { Props } from 'tastycss-react'

export type JengaOverlayProps = OverlayProps

function Overlay(props: JengaOverlayProps, ref) {
  const {
    children,
    isOpen,
    container,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
  } = props
  const [exited, setExited] = useState(!isOpen)
  const { root } = useProviderProps({} as Props)

  const handleEntered = useCallback(() => {
    setExited(false)
    if (onEntered) {
      onEntered()
    }
  }, [onEntered])

  const handleExited = useCallback(() => {
    setExited(true)
    if (onExited) {
      onExited()
    }
  }, [onExited])

  // Don't un-render the overlay while it's transitioning out.
  const mountOverlay = isOpen || !exited
  if (!mountOverlay) {
    // Don't bother showing anything if we don't have to.
    return null
  }

  // UNSAFE_style={{background: 'transparent', isolation: 'isolate'}}

  const contents = (
    <Provider ref={ref}>
      <OpenTransition
        in={isOpen}
        appear
        onExit={onExit}
        onExiting={onExiting}
        onExited={handleExited}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={handleEntered}
      >
        {children}
      </OpenTransition>
    </Provider>
  )

  return createPortal(contents, container || root || document.body)
}

const _Overlay = forwardRef(Overlay)
export { _Overlay as Overlay }
