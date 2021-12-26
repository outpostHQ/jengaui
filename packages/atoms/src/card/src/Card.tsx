import React, { forwardRef } from 'react'
import {
  extractStyles,
  BaseProps,
  ContainerStyleProps,
  Element,
  CONTAINER_STYLES,
} from 'tastycss-react'
import { filterBaseProps } from '@jenga-ui/core'

const DEFAULT_STYLES = {
  display: 'block',
  flow: 'column',
  radius: '1x',
  fill: '#white',
  border: true,
  padding: '3x',
}

export interface JengaCardProps
  extends BaseProps,
    Partial<ContainerStyleProps> {}

export const Card = forwardRef((props: JengaCardProps, ref) => {
  const styles = extractStyles(props, CONTAINER_STYLES, DEFAULT_STYLES)

  return (
    <Element
      role="region"
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
})

Card.displayName = 'Card'
