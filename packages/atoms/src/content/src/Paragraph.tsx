import React, { forwardRef } from 'react'
import { JengaTextProps, Text } from './Text'
import { CONTAINER_STYLES, TEXT_STYLES } from 'tastycss-react'
import { extractStyles } from 'tastycss-react'
import { ContainerStyleProps } from 'tastycss-react'
import { Styles } from 'tastycss-react'

const DEFAULT_STYLES: Styles = {
  preset: 'p3',
  color: '#dark.75',
  display: 'block',
}

const STYLE_PROPS = [...CONTAINER_STYLES, ...TEXT_STYLES]

export interface JengaParagraphProps
  extends JengaTextProps,
    Partial<ContainerStyleProps> {}

export const Paragraph = forwardRef((props: JengaParagraphProps, ref) => {
  const styles = extractStyles(props, STYLE_PROPS, DEFAULT_STYLES)

  return <Text as="p" qa="Paragraph" {...props} styles={styles} ref={ref} />
})

Paragraph.displayName = 'Paragraph'
