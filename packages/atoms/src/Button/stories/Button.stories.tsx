import React from 'react'
import Button from '../src/Button'

export default {
  title: 'NUML / Atoms / Button',
  component: Button,
}

export const Danger = (): JSX.Element => <Button type="danger">Danger</Button>
export const Default = (): JSX.Element => (
  <Button as="div" type="default">
    Default
  </Button>
)
