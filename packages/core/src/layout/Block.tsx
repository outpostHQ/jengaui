import React from 'react'
import { forwardRef } from 'react'
import { FocusableRef } from '@react-types/shared'
import {
  CONTAINER_STYLES,
  extractStyles,
  ContainerStyleProps,
  AllBaseProps,
  Element,
} from 'tastycss-react'
import { filterBaseProps } from '@jenga-ui/core'

const DEFAULT_STYLES = {
  display: 'block',
}

export interface BlockProps
  extends Partial<Omit<AllBaseProps, keyof ContainerStyleProps | 'as'>>,
    Partial<ContainerStyleProps> {}

const Block = (props: BlockProps, ref: FocusableRef<HTMLElement>) => {
  const styles = extractStyles(props, CONTAINER_STYLES, DEFAULT_STYLES)

  return (
    <Element
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
}

const _Block = forwardRef(Block)

export { _Block as Block }
