import React, { forwardRef } from 'react'
import {
  extractStyles,
  styled,
  CONTAINER_STYLES,
  BaseProps,
  ContainerStyleProps,
  Styles,
} from 'tastycss-react'
import { filterBaseProps, Action, Suffix, Block } from '@jenga-ui/core'
import { CloseOutlined } from '@ant-design/icons'

const THEMES = {
  success: {
    fill: '#success-bg',
    color: '#success-text',
    border: '#success.40',
  },
  danger: {
    fill: '#danger-bg',
    color: '#danger-text',
    border: '#danger.40',
  },
  note: {
    fill: '#note-bg',
    color: '#note-text',
    border: '#note.40',
  },
  disabled: {
    fill: '#dark.10',
    color: '#dark.40',
    border: '#dark.20',
  },
}

const RawTag = styled({
  name: 'Tag',
  styles: {
    position: 'relative',
    display: 'inline-flex',
    placeContent: 'center start',
    placeItems: 'center start',
    radius: '1r',
    preset: 't4m',
    width: '16px max-content max-content',
    height: 'min-content',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    padding: {
      '': '0 (1x - 1bw)',
      closable: '0 (2.5x - 1bw) 0 (1x - 1bw)',
    },
    fill: {
      '': '#white',
      ...Object.keys(THEMES).reduce((map, type) => {
        map[`[data-type="${type}"]`] = THEMES[type].fill

        return map
      }, {}),
    },
    color: {
      '': '#purple',
      ...Object.keys(THEMES).reduce((map, type) => {
        map[`[data-type="${type}"]`] = THEMES[type].color

        return map
      }, {}),
    },
    border: {
      '': '#purple.40',
      ...Object.keys(THEMES).reduce((map, type) => {
        map[`[data-type="${type}"]`] = THEMES[type].border

        return map
      }, {}),
    },
  },
  attrs: {
    role: 'status',
  },
})

const DEFAULT_CONTENT_STYLES: Styles = {
  width: 'max 100%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  pointerEvents: 'none',
} as const

const DEFAULT_CLOSE_STYLES: Styles = {
  display: 'grid',
  placeItems: 'center',
  color: true,
  placeSelf: 'center',
  opacity: {
    '': 0.85,
    'pressed | hovered': 1,
  },
  transition: 'opacity',
  padding: '0 .5x',
} as const

export interface TagProps extends BaseProps, Partial<ContainerStyleProps> {
  type?: keyof typeof THEMES | string
  isClosable?: boolean
  onClose?: () => void
}

const Tag = (allProps: TagProps, ref) => {
  const { type, isClosable, onClose, children, ...props } = allProps

  const styles = extractStyles(props, CONTAINER_STYLES)

  return (
    <RawTag
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      data-type={type}
      mods={{ closable: isClosable }}
      ref={ref}
    >
      <Block mods={{ closable: isClosable }} styles={DEFAULT_CONTENT_STYLES}>
        {children}
      </Block>
      {isClosable ? (
        <Suffix outerGap="0">
          <Action onPress={onClose} styles={DEFAULT_CLOSE_STYLES}>
            <CloseOutlined
              style={{
                fontSize: 'calc(var(--font-size) - (var(--border-width) * 2))',
              }}
            />
          </Action>
        </Suffix>
      ) : undefined}
    </RawTag>
  )
}

const _Tag = forwardRef(Tag)
export { _Tag as Tag }
