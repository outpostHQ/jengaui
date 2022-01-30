import React, { CSSProperties, forwardRef } from 'react'
import {
  extractStyles,
  ResponsiveStyleValue,
  BASE_STYLES,
  COLOR_STYLES,
  TEXT_STYLES,
} from 'tastycss-react'
import { filterBaseProps } from '@jenga-ui/core'
import {
  BaseProps,
  BaseStyleProps,
  ColorStyleProps,
  TagNameProps,
  TextStyleProps,
} from 'tastycss-react'
import { Styles } from 'tastycss-react'
import { styled } from 'tastycss-react'

const STYLE_LIST = [...BASE_STYLES, ...TEXT_STYLES, ...COLOR_STYLES] as const

const DEFAULT_STYLES: Styles = {
  display: {
    '': 'inline',
    ellipsis: 'block',
  },
  margin: '0',
  whiteSpace: {
    '': 'inherit',
    'nowrap | ellipsis': 'nowrap',
  },
  textOverflow: {
    '': false,
    ellipsis: 'ellipsis',
  },
  overflow: {
    '': false,
    ellipsis: 'hidden',
  },
  width: {
    '': false,
    ellipsis: 'max 100%',
  },
}

export const TEXT_PROP_MAP = {
  align: 'textAlign',
  transform: 'textTransform',
  weight: 'fontWeight',
  italic: 'fontStyle',
} as const

export interface JengaTextProps
  extends BaseProps,
    TagNameProps,
    Partial<TextStyleProps>,
    Partial<BaseStyleProps>,
    Partial<ColorStyleProps> {
  /**
   * Whether the text uses the monospace font.
   */
  monospace?: boolean
  /**
   * Whether the text overflow is ellipsis
   */
  ellipsis?: boolean
  /**
   * Whether the text is not wrapping
   */
  nowrap?: boolean
  /**
   * Whether the text has italic style
   */
  italic?: ResponsiveStyleValue<CSSProperties['fontStyle']>
  weight?: string | number
  transform?: ResponsiveStyleValue<CSSProperties['textTransform']>
}

const RawText = styled({
  name: 'Text',
  tag: 'span',
  availableMods: ['nowrap', 'ellipsis'],
  styles: DEFAULT_STYLES,
})

const _Text = forwardRef((allProps: JengaTextProps, ref) => {
  const {
    as,
    qa,
    block,
    // styleName,
    ellipsis,
    css,
    nowrap,
    ...props
  } = allProps

  const styles = extractStyles(props, STYLE_LIST, {}, TEXT_PROP_MAP)

  return (
    <RawText
      as={as || 'span'}
      qa={qa || 'Text'}
      // styleName={styleName}
      mods={{
        nowrap,
        ellipsis,
      }}
      block={!!(block || ellipsis)}
      css={css}
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
    />
  )
})

_Text.displayName = '_Text'

const Text = Object.assign(_Text, {
  Minor: forwardRef(function MinorText(props: JengaTextProps, ref) {
    return <Text ref={ref} color="#minor" {...props} />
  }),
  Danger: forwardRef(function DangerText(props: JengaTextProps, ref) {
    return <Text role="alert" ref={ref} color="#danger-text" {...props} />
  }),
  Success: forwardRef(function SuccessText(props: JengaTextProps, ref) {
    return <Text ref={ref} color="#success-text" {...props} />
  }),
  Strong: forwardRef(function StrongText(props: JengaTextProps, ref) {
    return (
      <Text as="strong" preset="strong" ref={ref} color="#dark" {...props} />
    )
  }),
  Emphasis: forwardRef(function EmphasisText(props: JengaTextProps, ref) {
    return <Text as="em" preset="em" ref={ref} {...props} />
  }),
  Selection: forwardRef(function SelectionText(props: JengaTextProps, ref) {
    return <Text ref={ref} color="#dark" fill="#note.30" {...props} />
  }),
})

export { Text }
