import React from 'react'
import { ButtonProps } from './ButtonProps'

const Button = (props: ButtonProps): JSX.Element => {
  const { fontStyle } = props
  return <button>Button</button>
}

export default Button
