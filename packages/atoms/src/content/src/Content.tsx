import React, { forwardRef } from 'react'
import { styled } from 'tastycss-react'
import { CONTAINER_STYLES, TEXT_STYLES } from 'tastycss-react'
import { extractStyles } from 'tastycss-react'
import { filterBaseProps } from '@jenga-ui/core'
import { useSlotProps } from '@jenga-ui/core'
import { BaseProps, ContainerStyleProps, TextStyleProps } from 'tastycss-react'

const STYLE_LIST = [...CONTAINER_STYLES, ...TEXT_STYLES]

const RawContent = styled({
  name: 'Content',
  tag: 'section',
  styles: {
    gridArea: 'content',
    preset: 'p3',
    color: '#dark.75',
    display: 'block',
    flow: 'column',
    gap: '2x',
  },
  attrs: {
    'data-id': 'Content',
  },
})

export interface JengaContentProps
  extends BaseProps,
    Partial<ContainerStyleProps>,
    Partial<TextStyleProps> {}

export const Content = forwardRef((props: JengaContentProps, ref) => {
  props = useSlotProps(props, 'content')

  const styles = extractStyles(props, STYLE_LIST)

  return (
    <RawContent
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
})

Content.displayName = 'Content'
