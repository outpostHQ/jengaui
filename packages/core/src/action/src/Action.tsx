import React, { forwardRef } from 'react'
import { filterBaseProps } from '@jenga-ui/core'
import { useFocusableRef } from '@react-spectrum/utils'
import { ActionProps } from './ActionProps'
import { FocusableRef } from '@react-types/shared'
import { propDeprecationWarning } from '@jenga-ui/core'
import {
  Element,
  extractStyles,
  Styles,
  CONTAINER_STYLES,
  TEXT_STYLES,
} from 'tastycss-react'
import { useButton } from '@react-aria/button'
import { mergeProps } from '@react-aria/utils'
import { useHover } from '@react-aria/interactions'
import { useFocus } from './utils'

// type AnchorTargetType = '_self' | '_blank' | '_parent' | '_top'

// styles
const DEFAULT_STYLES: Styles = {
  reset: 'button',
  position: 'relative',
  opacity: {
    '': 1,
    disabled: 0.4,
  },
  cursor: {
    '': 'pointer',
    disabled: 'default',
  },
  margin: 0,
  fontFamily: 'var(--font)',
  fontWeight: 'inherit',
  border: 0,
  padding: 0,
  outline: {
    '': '#purple-03.0',
    focused: '#purple-03',
  },
  transition: 'theme',
} as const

const DEPRECATED_PROPS = ['disabled', 'onClick']
const STYLE_PROPS = [...CONTAINER_STYLES, ...TEXT_STYLES]

export const Action = forwardRef(
  (props: ActionProps, ref: FocusableRef<HTMLElement>): JSX.Element => {
    const {
      to,
      typeAttribute,
      label,
      skipWarnings,
      isDisabled,
      ...additionalProps
    } = props

    if (!skipWarnings) {
      propDeprecationWarning('Action', props, DEPRECATED_PROPS)
      // TODO: deprecationWarning
    }

    let as = props.as
    as = to ? 'a' : as || 'button'

    // const router = useContext(UIKitContext).router;
    // const { newTab, href } = parseTo(to);
    // const target = newTab ? '_blank' : undefined;
    const domRef = useFocusableRef(ref)
    const styles = extractStyles(additionalProps, STYLE_PROPS, DEFAULT_STYLES)

    const { buttonProps, isPressed } = useButton(additionalProps, domRef)
    const { hoverProps, isHovered } = useHover({ isDisabled })
    const { focusProps, isFocused } = useFocus({ isDisabled }, true)

    console.error('Action')

    return (
      <Element
        data-is-hovered={isHovered && !isDisabled ? '' : null}
        data-is-pressed={isPressed && !isDisabled ? '' : null}
        data-is-focused={isFocused && !isDisabled ? '' : null}
        data-is-disabled={isDisabled || null}
        aria-label={label}
        {...mergeProps(
          buttonProps,
          hoverProps,
          focusProps,
          // customProps,
          filterBaseProps(additionalProps, { eventProps: true })
        )}
        type={typeAttribute || 'button'}
        // rel={as === 'a' && newTab ? 'rel="noopener noreferrer"' : undefined}
        ref={domRef as any}
        as={as}
        isDisabled={isDisabled}
        styles={styles}
        // target={target}
        // href={href}
      />
    )
  }
)
