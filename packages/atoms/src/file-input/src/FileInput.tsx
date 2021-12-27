import React, {
  forwardRef,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useProviderProps, Action } from '@jenga-ui/core'
import {
  extractStyles,
  useContextStyles,
  BaseProps,
  Styles,
  BlockStyleProps,
  PositionStyleProps,
  CONTAINER_STYLES,
} from 'tastycss-react'
import { AriaTextFieldProps } from '@react-types/textfield'
import { FieldWrapper, FormFieldProps } from '@jenga-ui/form'
import { createFocusableRef } from '@react-spectrum/utils'

const DEFAULT_WRAPPER_STYLES: any = {
  display: 'inline-flex',
  position: 'relative',
  preset: 't3',
  padding: '.75x 1x',
  gap: '1x',
  flow: 'row',
  placeItems: 'center start',
  fill: '#white',
  border: true,
  radius: true,
  cursor: 'pointer',
  overflow: 'hidden',
  '[Button]': {
    radius: 'round',
    fill: {
      '': '#light',
      'hovered | focused | pressed': '#purple-04',
      disabled: '#light',
    },
    color: '#dark',
    padding: '.5x 1x',
    transition: 'fill',
  },
  '[Placeholder]': {
    color: '#dark-02',
  },
  '[Value]': {
    color: '#dark-02',
  },
  '[Input]': {
    position: 'absolute',
    top: '-50px',
    right: 0,
    bottom: 0,
    left: 0,
    radius: '@content-radius',
    // opacity: 0,
    cursor: 'pointer',
    zIndex: 10,
  },
}

export interface JengaFileInputProps
  extends BaseProps,
    Partial<PositionStyleProps>,
    Partial<BlockStyleProps>,
    Partial<AriaTextFieldProps>,
    Partial<FormFieldProps> {
  size?: 'small' | 'default' | 'large' | string
  /** The input ref */
  inputRef?: RefObject<HTMLInputElement>
  /** Style map for the input */
  inputStyles?: Styles
}

function FileInput(props: JengaFileInputProps, ref) {
  const {
    id,
    name,
    qa,
    qaVal,
    onChange,
    placeholder,
    label,
    labelPosition,
    isRequired,
    necessityIndicator,
    necessityLabel,
    labelStyles,
    labelProps,
    isDisabled,
    validationState,
    message,
    requiredMark,
    // tooltip,
    ...otherProps
  } = useProviderProps(props)

  let { inputRef, inputStyles } = props

  const [value, setValue] = useState()
  const domRef = useRef(null)
  const defaultInputRef = useRef(null)
  inputRef = inputRef || defaultInputRef

  const styles = extractStyles(otherProps, CONTAINER_STYLES)

  inputStyles = {
    ...DEFAULT_WRAPPER_STYLES,
    ...useContextStyles('FileInput', otherProps),
    ...inputStyles,
  }

  const onLocalChange = useCallback(
    (event) => {
      const value = event.target.value

      onChange?.(value)

      setValue(value)
    },
    [onChange]
  )

  // Expose imperative interface for ref
  useImperativeHandle(ref, () => ({
    ...createFocusableRef(domRef, inputRef),
    select() {
      if (inputRef?.current) {
        inputRef.current.select()
      }
    },
    getInputElement() {
      return inputRef?.current
    },
  }))

  const fileInput = (
    <Action
      qa={qa || 'FileInput'}
      styles={inputStyles}
      isDisabled={isDisabled}
      ref={domRef}
      mods={{
        selected: !!value,
      }}
    >
      <input
        id={id}
        name={name}
        ref={inputRef}
        onChange={onLocalChange}
        data-element="Input"
        type="file"
        tabIndex={-1}
      />
      <div data-element="Button">Choose file</div>
      <div data-element={value ? 'Value' : 'Placeholder'}>
        {value || placeholder || 'No file selected'}
      </div>
    </Action>
  )

  return (
    <FieldWrapper
      {...{
        labelPosition,
        label,
        styles,
        isRequired,
        labelStyles,
        necessityIndicator,
        necessityLabel,
        labelProps,
        isDisabled,
        validationState,
        message,
        requiredMark,
        // tooltip,
        Component: fileInput,
        ref: domRef,
      }}
    />
  )
}

/**
 * FileInputs are file inputs that allow users to select local files to
 * upload them to the server.
 */
const _FileInput = forwardRef(FileInput)
export { _FileInput as FileInput }
