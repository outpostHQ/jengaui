import React, { forwardRef } from 'react'
import { FocusableRef } from '@react-types/shared'
import {
  AllBaseProps,
  Element,
  // Styles,
  // pointsToZones,
  // renderStyles,
} from 'tastycss-react'
// import { BreakpointsProvider } from 'tastycss-react'

// const INLINE_MAP: { [x: string]: string } = {
//   block: 'inline',
//   grid: 'inline-grid',
//   flex: 'inline-flex',
// } as const

// const DEFAULT_STYLES: Styles = {
//   display: 'inline-block',
// } as const

export const Base = forwardRef(
  (props: AllBaseProps, ref: FocusableRef<HTMLElement>): JSX.Element => {
    const {
      // styles: originalStyles,
      // block,
      mods,
      // inline,
      isHidden,
      isDisabled,
      qa,
      qaVal,
      ...additionalProps
    } = props

    // const styles: Styles = { ...DEFAULT_STYLES, ...originalStyles }

    // if (block) {
    //   styles.display = 'block'
    // }

    // if (inline) {
    //   styles.display =
    //     typeof styles.display === 'string'
    //       ? INLINE_MAP[styles.display || 'block']
    //       : 'block'
    // }

    // const contextBreakpoints = useContext(BreakpointsContext)
    // const zones = pointsToZones(breakpoints || contextBreakpoints)

    // css = `${css || ''}${renderStyles(styles, zones)}`

    if (additionalProps.hidden == null && isHidden) {
      additionalProps.hidden = isHidden
    }

    if (additionalProps.disabled == null && isDisabled) {
      additionalProps.disabled = isDisabled
    }

    return (
      <Element
        data-qa={qa}
        data-qaval={qaVal}
        {...additionalProps}
        ref={ref}
        mods={mods}
      />
    )
  }
)
