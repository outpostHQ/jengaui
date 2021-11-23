import React, { forwardRef, ReactNode } from 'react'
import {
  extractStyles,
  CONTAINER_STYLES,
  BaseProps,
  ContainerStyleProps,
  Element,
  Styles,
} from 'tastycss-react'
import { filterBaseProps } from '@jenga-ui/core'

const DEFAULT_STYLES = {
  display: 'grid',
  gap: '1x',
  flow: 'row',
  fill: '#purple',
  color: '#white',
  radius: 'round',
  placeContent: 'center',
  width: '@avatar-size @avatar-size @avatar-size',
  height: '@avatar-size @avatar-size @avatar-size',
  fontSize: 'calc(@avatar-size / 2)',
  lineHeight: 'calc(@avatar-size / 2)',
  fontWeight: 500,
}

export interface AvatarProps extends BaseProps, Partial<ContainerStyleProps> {
  icon?: ReactNode
  size?: Styles['size']
}

export const Avatar = forwardRef(
  ({ size = '4x', icon, children, ...props }: AvatarProps, ref) => {
    const styles = extractStyles(props, CONTAINER_STYLES, {
      ...DEFAULT_STYLES,
      '--avatar-size': size,
    })

    return (
      <Element
        {...filterBaseProps(props, { eventProps: true })}
        styles={styles}
        ref={ref}
        data-theme="special"
      >
        {icon}
        {children}
      </Element>
    )
  }
)
