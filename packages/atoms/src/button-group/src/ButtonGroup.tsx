import React, { forwardRef } from 'react'
import { useSlotProps, Space, JengaSpaceProps } from '@jenga-ui/core'
import { useContextStyles } from 'tastycss-react'

export const ButtonGroup = forwardRef((props: JengaSpaceProps, ref) => {
  const slotProps = useSlotProps(props, 'buttonGroup')
  let { styles } = slotProps
  const { ...otherProps } = slotProps

  const contextStyles = useContextStyles('ButtonGroup', otherProps)

  console.log(contextStyles)

  styles = styles
    ? {
        ...contextStyles,
        ...styles,
      }
    : contextStyles

  return <Space gridArea="buttonGroup" styles={styles} ref={ref} {...props} />
})
