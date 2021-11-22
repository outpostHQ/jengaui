/* eslint-disable react/prop-types */
import React from 'react'
import { DollarCircleOutlined } from '@ant-design/icons'
import { Input } from '../../input'

export default {
  title: 'jenga-ui / Atoms / BaseInput',
  component: Input,
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
      description: 'Disables the input.',
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state with spinner. Also works as disabled',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    type: {
      defaultValue: 'default',
      description: "A visual type of the input. Don't affect any logic",
      control: {
        type: 'radio',
        options: [
          undefined,
          'default',
          'primary',
          'link',
          'outline',
          'danger',
          'clear',
          'item',
          'tab',
        ],
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    isSelected: {
      control: 'boolean',
      description: 'Selected state for Tab type inputs',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    size: {
      defaultValue: undefined,
      description: 'The size of the input',
      control: {
        type: 'radio',
        options: [undefined, 'default', 'small'],
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    radius: {
      defaultValue: undefined,
      control: {
        type: 'radio',
        options: [undefined, '0', '1r', 'round'],
      },
      table: {
        type: { summary: 'string|number' },
        defaultValue: { summary: '1r' },
      },
    },
    label: {
      defaultValue: 'Input',
      control: 'text',
    },
  },
}

const Template = ({
  size,
  type,
  radius,
  isSelected,
  isDisabled,
  isLoading,
  label,
  icon,
}) => (
  <Input
    size={size}
    type={type}
    radius={radius}
    isDisabled={isDisabled}
    isLoading={isLoading}
    // isSelected={isSelected}
    // icon={icon ? <DollarCircleOutlined /> : undefined}
    // onPress={() => console.log('Press')}
  >
    {label}
  </Input>
)

export const Default = Template.bind({})
Default.args = {
  label: 'Input',
}

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
  label: 'Input',
}

export const Outline = Template.bind({})
Outline.args = {
  type: 'outline',
  label: 'Input',
}

export const Clear = Template.bind({})
Clear.args = {
  type: 'clear',
  label: 'Input',
}

export const Item = Template.bind({})
Item.args = {
  label: 'Input',
  type: 'item',
}

export const Tab = Template.bind({})
Tab.args = {
  label: 'Tab',
  type: 'tab',
  selected: true,
}

export const Link = Template.bind({})
Link.args = {
  label: 'Link',
  type: 'link',
  selected: true,
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  icon: true,
}

export const Loading = Template.bind({})
Loading.args = {
  icon: true,
  isLoading: true,
  label: '',
}
