import { useDOMRef } from '@react-spectrum/utils'
import React, { forwardRef, MouseEventHandler } from 'react'
import {
  useProviderProps,
  LabelPosition,
  NecessityIndicator,
  ValidationState,
  filterBaseProps,
} from '@jenga-ui/core'
import {
  extractStyles,
  useContextStyles,
  BaseProps,
  ContainerStyleProps,
  TagNameProps,
  Element,
  Styles,
  CONTAINER_STYLES,
} from 'tastycss-react'

const REQUIRED_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 100 125"
    style={{
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      enableBackground: 'new 0 0 100 100',
      width: '.8em',
      height: '.8em',
      transform: 'rotate(-5deg)',
    }}
  >
    <switch>
      <g>
        <polygon
          fill="currentColor"
          points="97.5,47.5 90.5,26.1 61.3,35.6 61.3,4.8 38.7,4.8 38.7,35.6 9.5,26.1 2.5,47.5 31.8,57 13.7,82 31.9,95.2     50,70.3 68.1,95.2 86.3,82 68.2,57"
        />
      </g>
    </switch>
  </svg>
)

const INTL_MESSAGES = {
  '(required)': '(required)',
  '(optional)': '(optional)',
}

export const INLINE_LABEL_STYLES: Styles = {
  fontWeight: 400,
  preset: 'default',
  color: {
    '': '#dark.85',
    invalid: '#danger-text',
    disabled: '#dark.30',
  },
  whiteSpace: 'nowrap',
} as const

export const LABEL_STYLES: Styles = {
  display: 'block',
  fontWeight: 600,
  preset: 'default',
  padding: {
    '': '0',
    side: '(1x - 1bw) 0',
  },
  color: {
    '': '#dark',
    invalid: '#danger-text',
    disabled: '#dark.30',
  },
  whiteSpace: 'nowrap',
} as const

export interface CubeLabelProps
  extends BaseProps,
    TagNameProps,
    ContainerStyleProps {
  labelPosition?: LabelPosition
  necessityIndicator?: NecessityIndicator
  isRequired?: boolean
  includeNecessityIndicatorInAccessibilityName?: boolean
  htmlFor?: string
  for?: string
  validationState?: ValidationState
  onClick?: MouseEventHandler
}

function Label(props: CubeLabelProps, ref) {
  props = useProviderProps<CubeLabelProps>(props)

  const {
    as,
    qa,
    children,
    labelPosition = 'top',
    isRequired,
    necessityIndicator = isRequired != null ? 'icon' : null,
    includeNecessityIndicatorInAccessibilityName = false,
    htmlFor,
    isDisabled,
    validationState,
    for: labelFor,
    onClick,
    ...otherProps
  } = props

  const domRef = useDOMRef(ref)

  const contextStyles = useContextStyles('Label', otherProps)

  const styles = extractStyles(otherProps, CONTAINER_STYLES, {
    ...LABEL_STYLES,
    ...contextStyles,
  })

  const formatMessage = (message) => INTL_MESSAGES[message]
  const necessityLabel = isRequired
    ? formatMessage('(required)')
    : formatMessage('(optional)')
  const icon = (
    <span
      aria-label={
        includeNecessityIndicatorInAccessibilityName
          ? formatMessage('(required)')
          : undefined
      }
    >
      {REQUIRED_ICON}
    </span>
  )

  return (
    <Element
      as={as || 'label'}
      qa={qa || 'Label'}
      {...filterBaseProps(otherProps)}
      onClick={onClick}
      ref={domRef}
      styles={styles}
      htmlFor={labelFor || htmlFor}
      mods={{
        side: labelPosition === 'side',
        disabled: isDisabled,
        invalid: validationState === 'invalid',
        valid: validationState === 'valid',
      }}
    >
      {typeof children !== 'string' ? (
        children
      ) : (
        <>
          {children}
          {(necessityIndicator === 'label' ||
            (necessityIndicator === 'icon' && isRequired)) &&
            ' \u200b'}
          {/* necessityLabel is hidden to screen readers if the field is required because
           * aria-required is set on the field in that case. That will already be announced,
           * so no need to duplicate it here. If optional, we do want it to be announced here. */}
          {necessityIndicator === 'label' && (
            <span
              aria-hidden={
                !includeNecessityIndicatorInAccessibilityName
                  ? isRequired
                  : undefined
              }
            >
              {necessityLabel}
            </span>
          )}
          {necessityIndicator === 'icon' && isRequired && icon}
        </>
      )}
    </Element>
  )
}

const _Label = forwardRef(Label)
export { _Label as Label }
