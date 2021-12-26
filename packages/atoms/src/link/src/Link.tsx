import React, { forwardRef } from 'react'
import { Button, ButtonProps } from '@jenga-ui/button'
import { FocusableRef } from '@react-types/shared'

export const Link = forwardRef(
  (props: ButtonProps, ref: FocusableRef<HTMLElement>) => {
    return <Button type="link" {...props} ref={ref} />
  }
)

Link.displayName = 'Link'
