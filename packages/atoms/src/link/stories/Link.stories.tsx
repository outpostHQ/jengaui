import React from 'react'
import { Link } from '../'

export default {
  title: 'jenga-ui / Atoms / Link',
  component: Link,
  argTypes: {
    isDisabled: {
      defaultValue: false,
      description: 'Disables the button.',
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    label: {
      defaultValue: 'Button',
      control: 'text',
    },
  },
}

const Template = ({ isDisabled, label }: any) => (
  <Link
    isDisabled={isDisabled}
    onPress={() => console.log('Press')}
    to="!https://numl.design"
  >
    {label}
  </Link>
)

export const Default = Template.bind({})
Default.args = {
  label: 'Link',
}
