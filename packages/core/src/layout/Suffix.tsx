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
  placeContent: 'stretch',
  placeItems: 'center',
  flow: 'column',
  gap: 0,
  position: 'absolute',
  right: '@suffix-gap',
  top: '@suffix-gap',
  bottom: '@suffix-gap',
  color: '#dark.75',
  height: '(100% - (2 * @suffix-gap))',
}

export interface JengaSuffixProps
  extends BaseProps,
    Partial<ContainerStyleProps> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onWidthChange?: Function
  outerGap?: CSSProperties['gap']
}

const Suffix = (allProps: JengaSuffixProps, outerRef) => {
  const { onWidthChange, outerGap = '1bw', children, ...props } = allProps
  const styles = extractStyles(props, CONTAINER_STYLES, DEFAULT_STYLES)
  const ref = useCombinedRefs(outerRef)

  useEffect(() => {
    if (ref && ref.current && onWidthChange) {
      onWidthChange(ref.current.offsetWidth)
    }
  }, [children, ref, onWidthChange])

  return (
    <Element
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
      style={{
        '--suffix-gap': parseStyle(outerGap).value,
      }}
    >
      {children}
    </Element>
  )
}

const _Suffix = forwardRef(Suffix)

export { _Suffix as Suffix }
