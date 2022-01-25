import React from 'react'
import { CubeTooltipTriggerProps, TooltipTrigger } from './TooltipTrigger'
import { JengaTooltipProps, Tooltip } from './Tooltip'
import { ReactNode, useEffect, useState } from 'react'
import { Styles } from 'tastycss-react'

export interface JengaTooltipProviderProps
  extends Omit<CubeTooltipTriggerProps, 'children'> {
  children: CubeTooltipTriggerProps['children'][0]
  title?: ReactNode
  tooltipStyles?: Styles
  width?: JengaTooltipProps['width']
}

function TooltipProvider(props: JengaTooltipProviderProps) {
  const [rendered, setRendered] = useState(false)
  const { title, children, tooltipStyles, width, ...otherProps } = props

  useEffect(() => {
    setRendered(true)
  })

  return rendered ? (
    <TooltipTrigger {...otherProps}>
      {children}
      <Tooltip styles={tooltipStyles} {...(width ? { width } : null)}>
        {title}
      </Tooltip>
    </TooltipTrigger>
  ) : (
    <>children</>
  )
}

const _TooltipProvider = TooltipProvider
export { _TooltipProvider as TooltipProvider }
