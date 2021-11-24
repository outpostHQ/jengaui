import React, { CSSProperties, forwardRef, useEffect } from 'react'
import {
  CONTAINER_STYLES,
  extractStyles,
  parseStyle,
  BaseProps,
  ContainerStyleProps,
  Element,
  Styles,
} from 'tastycss-react'
import { filterBaseProps, useCombinedRefs } from '../utils'

const DEFAULT_STYLES: Styles = {
  display: 'grid',
  position: 'absolute',
  placeItems: 'center',
  gap: 0,
  left: '@prefix-gap',
  top: '@prefix-gap',
  bottom: '@prefix-gap',
  color: '#dark.75',
  height: '(100% - (2 * @prefix-gap))',
}

export interface JengaPrefixProps
  extends BaseProps,
    Partial<ContainerStyleProps> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onWidthChange?: Function
  outerGap?: CSSProperties['gap']
}

const Prefix = (allProps: JengaPrefixProps, outerRef) => {
  const { onWidthChange, outerGap = '1bw', children, ...props } = allProps

  const styles = extractStyles(props, CONTAINER_STYLES, DEFAULT_STYLES)
  const ref = useCombinedRefs(outerRef)

  useEffect(() => {
    if (ref?.current && onWidthChange) {
      onWidthChange(ref.current.offsetWidth)
    }
  }, [children, ref, onWidthChange])

  return (
    <Element
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
      style={{
        '--prefix-gap': parseStyle(outerGap).value,
      }}
    >
      {children}
    </Element>
  )
}

const _Prefix = forwardRef(Prefix)

export { _Prefix as Prefix }
