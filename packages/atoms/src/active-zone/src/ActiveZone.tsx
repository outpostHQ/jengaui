import React, { forwardRef, MouseEventHandler } from 'react'
import { useHover } from '@react-aria/interactions'
import { mergeProps } from '@jenga-ui/core'
import { CONTAINER_STYLES, TEXT_STYLES } from 'tastycss-react'
import { Element } from 'tastycss-react'
import { extractStyles } from 'tastycss-react'
import { filterBaseProps } from '@jenga-ui/core'
import {
  BaseProps,
  BaseStyleProps,
  ContainerStyleProps,
  TagNameProps,
  TextStyleProps,
} from 'tastycss-react'
import { Styles } from 'tastycss-react'
import { useFocusableRef } from '@react-spectrum/utils'
import { FocusableOptions, useFocusable } from '@react-aria/focus'
import { useFocus } from '@jenga-ui/core'

export interface JengaActiveZoneProps
  extends BaseProps,
    TagNameProps,
    BaseStyleProps,
    ContainerStyleProps,
    TextStyleProps,
    FocusableOptions {
  label?: string
  onClick?: MouseEventHandler
}

const DEFAULT_STYLES: Styles = {
  display: 'inline-block',
  position: 'relative',
  opacity: {
    '': 1,
    '[disabled]': 0.4,
  },
  transition: 'theme',
} as const

const STYLE_PROPS = [...CONTAINER_STYLES, ...TEXT_STYLES]

const ActiveZone = (
  { as, label, onClick, ...props }: JengaActiveZoneProps,
  ref
) => {
  const isDisabled = props.isDisabled
  const styles = extractStyles(props, STYLE_PROPS, DEFAULT_STYLES)
  const domRef = useFocusableRef(ref)

  const { hoverProps, isHovered } = useHover({ isDisabled })
  const { focusProps, isFocused } = useFocus({ isDisabled })
  const { focusableProps } = useFocusable(props, domRef)

  return (
    <Element
      data-is-hovered={isHovered && !isDisabled ? '' : null}
      data-is-focused={isFocused && !isDisabled ? '' : null}
      data-is-disabled={isDisabled || null}
      aria-label={label}
      {...mergeProps(
        hoverProps,
        focusProps,
        focusableProps,
        { onClick },
        filterBaseProps(props, { eventProps: true })
      )}
      tabIndex={props.excludeFromTabOrder || isDisabled ? -1 : 0}
      as={as}
      styles={styles}
      ref={domRef}
    />
  )
}

const _ActiveZone = forwardRef(ActiveZone)
export { _ActiveZone as ActiveZone }
