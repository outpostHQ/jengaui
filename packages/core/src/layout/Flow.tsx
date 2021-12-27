import React, { forwardRef } from 'react'

import {
  Element,
  CONTAINER_STYLES,
  extractStyles,
  BaseProps,
  ContainerStyleProps,
} from 'tastycss-react'
import { filterBaseProps } from '../utils'

const DEFAULT_STYLES = {
  display: 'block',
  flow: 'column',
}

const STYLE_PROPS = CONTAINER_STYLES

export interface JengaFlowProps
  extends BaseProps,
    Partial<ContainerStyleProps> {}

const Flow = (props: JengaFlowProps, ref) => {
  const styles = extractStyles(props, STYLE_PROPS, DEFAULT_STYLES)

  return (
    <Element
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
}

const _Flow = forwardRef(Flow)

export { _Flow as Flow }
