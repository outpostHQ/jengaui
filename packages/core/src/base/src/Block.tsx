import React from 'react'
import { forwardRef } from 'react'
import { FocusableRef } from '@react-types/shared'
import { Base } from './Base'
import {
  CONTAINER_STYLES,
  extractStyles,
  ContainerStyleProps,
  AllBaseProps,
} from 'tastycss-react'
import { filterBaseProps } from '@jenga-ui/core'

const DEFAULT_STYLES = {
  display: 'block',
}

export interface BlockProps
  extends Partial<Omit<AllBaseProps, keyof ContainerStyleProps | 'as'>>,
    Partial<ContainerStyleProps> {}

export const Block = forwardRef(
  (props: BlockProps, ref: FocusableRef<HTMLElement>) => {
    const styles = extractStyles(props, CONTAINER_STYLES, DEFAULT_STYLES)

    return (
      <Base
        {...filterBaseProps(props, { eventProps: true })}
        styles={styles}
        ref={ref}
      />
    )
  }
)
