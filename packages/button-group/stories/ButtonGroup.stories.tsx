import React from 'react'
import { Button } from '../../button'
import { ButtonGroup } from '../'

export default {
  title: 'Jenga-UI / Atoms / ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    icon: {
      defaultValue: false,
      description: 'Show the icon',
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    isDisabled: {
      defaultValue: false,
      description: 'Disables the button group.',
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
}

const Template = () => {
  return (
    <ButtonGroup>
      <Button onPress={close} type="primary">
        Action
      </Button>
      <Button onPress={close}>Sec</Button>
      <Button onPress={close}>Cancel</Button>
    </ButtonGroup>
  )
}

export const Default = Template.bind({})
