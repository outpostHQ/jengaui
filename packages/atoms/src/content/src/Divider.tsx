import React, { forwardRef } from 'react'
import { Element } from 'tastycss-react'
import {
  extractStyles,
  BaseProps,
  OuterStyleProps,
  OUTER_STYLES,
  BASE_STYLES,
  COLOR_STYLES,
} from 'tastycss-react'
import { filterBaseProps, useSlotProps } from '@jenga-ui/core'

const STYLE_LIST = [...OUTER_STYLES, ...BASE_STYLES, ...COLOR_STYLES]

const DEFAULT_STYLES = {
  gridArea: 'divider',
  display: 'block',
  height: '1bw 1bw',
  fill: '#border',
  border: '0',
  margin: '0',
}

export interface JengaDividerProps
  extends BaseProps,
    Partial<OuterStyleProps> {}

export const Divider = forwardRef((props: JengaDividerProps, ref) => {
  props = useSlotProps(props, 'divider')

  const styles = extractStyles(props, STYLE_LIST, DEFAULT_STYLES)

  return (
    <Element
      as="hr"
      data-id="Divider"
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
})

Divider.displayName = 'Divider'
