import { ReactNode } from 'react'
import { Button, JengaButtonProps } from '@jenga-ui/button'
import { Text } from '@jenga-ui/content'
import { Styles } from 'tastycss'
import { Space } from '@jenga-ui/layout'
import { CheckOutlined } from '@ant-design/icons'

const ACTION_BUTTON: Styles = {
  border: {
    '': '#clear',
    pressed: '#clear',
  },
  fill: {
    '': '#clear',
    hovered: '#dark.04',
    'pressed | selected': '#purple.1',
    disabled: '#clear',
  },
  color: {
    '': '#dark-02',
    hovered: '#dark-02',
    'pressed | selected': '#purple-text',
    disabled: '#dark-04',
  },
  cursor: {
    '': 'pointer',
    disabled: 'default',
  },
  shadow: '#clear',
  padding: {
    '': '(0.75x - 1px) (1.5x - 1px)',
    'selectable & !selected':
      '(0.75x - 1px) (1.5x - 1px) (0.75x - 1px) (1.5x - 1px + 22px)',
  },
  display: 'flex',
  flow: 'row',
  justifyContent: 'start',
  Postfix: {
    color: {
      '': '#dark-03',
      hovered: '#dark-03',
      'pressed | selected': '#purple-text',
      disabled: '#dark-04',
    },
  },
}

const getPostfix = (postfix) =>
  typeof postfix === 'string' ? (
    <Text nowrap color="inherit" data-element="Postfix">
      {postfix}
    </Text>
  ) : (
    postfix
  )

export type MenuButtonProps = {
  postfix: ReactNode
  isSelectable?: boolean
  disabled?: boolean
} & JengaButtonProps

export function MenuButton({
  children,
  icon,
  postfix,
  ...props
}: MenuButtonProps) {
  const { isSelected, isSelectable } = props
  const checkIcon = isSelectable && isSelected ? <CheckOutlined /> : null
  const mods = {
    ...props.mods,
    selectable: isSelectable,
    selected: isSelected,
  }

  return (
    <Button
      type="neutral"
      size="small"
      styles={ACTION_BUTTON}
      {...props}
      icon={checkIcon}
      mods={mods}
    >
      {icon && <Text color="inherit">{icon}</Text>}
      <Space gap="1x" placeContent="space-between" overflow="auto" width="100%">
        <Text color="inherit" ellipsis>
          {children}
        </Text>
        {postfix && getPostfix(postfix)}
      </Space>
    </Button>
  )
}
