import React, { forwardRef } from 'react'
import {
  CONTAINER_STYLES,
  extractStyles,
  BaseProps,
  ContainerStyleProps,
  Element,
} from 'tastycss-react'
import { filterBaseProps } from '../utils'

const DEFAULT_STYLES = {
  display: 'flex',
  flow: 'row',
  gap: '@(column-gap, 0)',
}

export interface JengaFlexProps
  extends BaseProps,
    Partial<ContainerStyleProps> {}

const PROP_MAP = {
  align: 'alignItems',
  justify: 'justifyItems',
} as const

const Flex = (props: JengaFlexProps, ref) => {
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

const _Flex = forwardRef(Flex)

export { _Flex as Flex }
