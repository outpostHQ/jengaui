import React, { forwardRef } from 'react'
import {
  CONTAINER_STYLES,
  extractStyles,
  Element,
  BaseProps,
  ContainerStyleProps,
} from 'tastycss-react'
import { filterBaseProps } from '../utils'
import { ShortGridStyles, ShortItemsStyles } from './layoutStyles'

const DEFAULT_STYLES = {
  display: 'grid',
  flow: 'row',
  gap: '@(column-gap, 0)',
}

export interface GridProps
  extends BaseProps,
    Partial<ContainerStyleProps>,
    Partial<ShortItemsStyles>,
    Partial<ShortGridStyles> {}

const PROP_MAP = {
  align: 'alignItems',
  justify: 'justifyItems',
  template: 'gridTemplate',
  columns: 'gridColumns',
  rows: 'gridRows',
  areas: 'gridAreas',
} as const

const Grid = (props: GridProps, ref) => {
  const styles = extractStyles(
    props,
    CONTAINER_STYLES,
    DEFAULT_STYLES,
    PROP_MAP
  )

  return (
    <Element
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
}

const _Grid = forwardRef(Grid)

export { _Grid as Grid }
