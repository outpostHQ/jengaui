import React, { forwardRef } from 'react'
import {
  extractStyles,
  styled,
  CONTAINER_STYLES,
  BaseProps,
  ContainerStyleProps,
  Element,
} from 'tastycss-react'
import { filterBaseProps } from '@jenga-ui/core'

const THEMES = {
  success: {
    fill: '#success-bg',
    color: '#success-text',
    border: '#success.40',
  },
  danger: {
    fill: '#danger-bg',
    color: '#danger-text',
    border: '#danger.40',
  },
  note: {
    fill: '#note-bg',
    color: '#note-text',
    border: '#note.40',
  },
  disabled: {
    fill: '#dark.10',
    color: '#dark.40',
    border: '#dark.20',
  },
}

const RawBadge = styled({
  name: 'Badge',
  styles: {
    display: 'inline-flex',
    placeContent: 'center',
    placeItems: 'center',
    padding: {
      '': '0',
      single: '0 1px',
      multiple: '0 2px',
    },
    radius: 'round',
    preset: 'tag',
    width: 'min 16px',
    height: '16px',
    textAlign: 'center',
    fontWeight: 600,
    color: '#white',
    fill: {
      '': '#purple',
      ...Object.keys(THEMES).reduce((map, type) => {
        map[`[data-type="${type}"]`] = THEMES[type].color

        return map
      }, {}),
    },
  },
  attrs: {
    role: 'region',
  },
})

export interface CubeBadgeProps extends BaseProps, ContainerStyleProps {
  type?: keyof typeof THEMES | string
}

const Badge = (allProps: CubeBadgeProps, ref) => {
  const { type, children, ...props } = allProps

  const styles = extractStyles(props, CONTAINER_STYLES)

  return (
    <RawBadge
      {...filterBaseProps(props, { eventProps: true })}
      data-type={type}
      mods={{
        single: typeof children === 'string' && children.length === 1,
        multiple: typeof children === 'string' && children.length === 2,
      }}
      styles={styles}
      ref={ref}
    >
      {children}
    </RawBadge>
  )
}

const _Badge = forwardRef(Badge)

export { _Badge as Badge }
