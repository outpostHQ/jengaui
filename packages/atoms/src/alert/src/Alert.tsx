import React, { forwardRef } from 'react'
import {
  extractStyles,
  Element,
  Styles,
  BaseProps,
  ContainerStyleProps,
  TextStyleProps,
  CONTAINER_STYLES,
  TEXT_STYLES,
} from 'tastycss-react'
import THEMES from '../../themes'
import { filterBaseProps } from '@jenga-ui/core'

const DEFAULT_STYLES: Styles = {
  display: 'block',
  flow: 'column',
  radius: '1x',
  padding: '1.5x',
  preset: 't3',
}

const STYLE_LIST = [...CONTAINER_STYLES, ...TEXT_STYLES] as const

export interface CubeAlertProps
  extends BaseProps,
    ContainerStyleProps,
    TextStyleProps {
  type?: keyof typeof THEMES
  label?: string
}

export const Alert = forwardRef((allProps: CubeAlertProps, ref) => {
  const { label, ...props } = allProps
  let { type } = allProps

  type = type || 'note'

  const styles = extractStyles(props, STYLE_LIST, {
    ...DEFAULT_STYLES,
    fill: THEMES[type] ? THEMES[type].fill : '#clear',
    border:
      THEMES[type] && THEMES[type].border ? THEMES[type].border : '#clear',
    color: '#dark',
  })

  return (
    <Element
      role="region"
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
})

Alert.displayName = 'Alert'
