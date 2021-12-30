import React, { forwardRef } from 'react'
import { styled } from 'tastycss-react'
import { CONTAINER_STYLES, TEXT_STYLES } from 'tastycss-react'
import { extractStyles } from 'tastycss-react'
import { filterBaseProps } from '@jenga-ui/core'
import { useSlotProps } from '@jenga-ui/core'
import { BaseProps, ContainerStyleProps, TextStyleProps } from 'tastycss-react'

const STYLE_LIST = [...CONTAINER_STYLES, ...TEXT_STYLES]

const RawHeader = styled({
  name: 'Header',
  tag: 'header',
  styles: {
    display: 'block',
    gridArea: 'header',
    flow: 'column',
  },
  attrs: {
    'data-id': 'Header',
  },
})

export interface JengaHeaderProps
  extends BaseProps,
    Partial<ContainerStyleProps>,
    Partial<TextStyleProps> {}

export const Header = forwardRef((props: JengaHeaderProps, ref) => {
  props = useSlotProps(props, 'header')

  const styles = extractStyles(props, STYLE_LIST)

  return (
    <RawHeader
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
})

Header.displayName = 'Header'
