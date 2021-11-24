import React, { forwardRef } from 'react'
import {
  CONTAINER_STYLES,
  extractStyles,
  BaseProps,
  ContainerStyleProps,
  Element,
} from 'tastycss-react'
import { filterBaseProps } from '../utils'
import { ShortItemsStyles } from './layoutStyles'

const DEFAULT_STYLES = {
  display: 'flex',
  gap: true,
}

export interface JengaSpaceProps
  extends BaseProps,
    Partial<ContainerStyleProps>,
    ShortItemsStyles {
  direction?: 'vertical' | 'horizontal'
}

const PROP_MAP = {
  align: 'alignItems',
  justify: 'justifyItems',
} as const

export const Space = forwardRef(function Space(props: JengaSpaceProps, ref) {
  const flow = props.direction
    ? props.direction === 'vertical'
      ? 'column'
      : 'row'
    : props.flow || 'row'
  const styles = extractStyles(
    props,
    CONTAINER_STYLES,
    {
      ...DEFAULT_STYLES,
      flow,
      alignItems: flow === 'row' ? 'center' : 'stretch',
    },
    PROP_MAP
  )

  return (
    <Element
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
})
