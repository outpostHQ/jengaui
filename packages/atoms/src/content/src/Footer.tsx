import React, { forwardRef } from 'react'
import { CONTAINER_STYLES, TEXT_STYLES } from 'tastycss-react'
import { extractStyles } from 'tastycss-react'
import { filterBaseProps } from '@jenga-ui/core'
import { useSlotProps } from '@jenga-ui/core'
import { BaseProps, ContainerStyleProps, TextStyleProps } from 'tastycss-react'
import { styled } from 'tastycss-react'

const STYLE_LIST = [...CONTAINER_STYLES, ...TEXT_STYLES]

const RawFooter = styled({
  name: 'Footer',
  styles: {
    gridArea: 'footer',
    display: 'block',
    flow: 'column',
  },
  attrs: {
    'data-id': 'Footer',
  },
})

export interface JengaFooterProps
  extends BaseProps,
    Partial<ContainerStyleProps>,
    Partial<TextStyleProps> {}

export const Footer = forwardRef((props: JengaFooterProps, ref) => {
  props = useSlotProps(props, 'footer')

  const styles = extractStyles(props, STYLE_LIST)

  return (
    <RawFooter
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
})

Footer.displayName = 'Footer'
