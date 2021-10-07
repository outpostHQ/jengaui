import React from 'react'
import { forwardRef } from 'react'
import { FocusableRef } from '@react-types/shared'
import { Base } from './Base'
import {
  extractStyles,
  BaseProps,
  ContainerStyleProps,
  Styles,
  CONTAINER_STYLES,
} from 'tastycss-react'
import { filterBaseProps } from '@numl-react/core'

type ShortItemsStyles = {
  align?: Styles['alignItems']
  justify?: Styles['justifyItems']
}

const DEFAULT_STYLES = {
  display: 'flex',
  gap: true,
}

export interface SpaceProps
  extends BaseProps,
    Partial<ContainerStyleProps>,
    Partial<ShortItemsStyles> {
  direction?: 'vertical' | 'horizontal'
}

const PROP_MAP = {
  align: 'alignItems',
  justify: 'justifyItems',
} as const

export const Space = forwardRef(function Space(
  props: SpaceProps,
  ref: FocusableRef<HTMLElement>
) {
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
    <Base
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
})
