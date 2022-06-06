import { Styles } from 'tastycss'

export const DEFAULT_INPUT_STYLES: Styles = {
  display: 'block',
  width: 'initial 100% initial',
  height: 'initial initial initial',
  color: {
    '': '#dark.85',
    invalid: '#danger-text',
    focused: '#dark.85',
    disabled: '#dark.30',
  },
  fill: {
    '': '#white',
    disabled: '#dark.04',
  },
  border: {
    '': true,
    focused: true,
    valid: '#success-text.50',
    invalid: '#danger-text.50',
    disabled: true,
  },
  outline: {
    '': '#purple-03.0',
    focused: '#purple-03',
    'invalid & focused': '#danger.50',
    'valid & focused': '#success.50',
  },
  radius: true,
  padding: {
    '': '(1.25x - 1bw) 1x (1.25x - 1bw) (1.5x - 1bw)',
    '[data-size="small"]': '(.75x - 1px) (1.5x - 1px)',
  },
  fontWeight: 400,
  textAlign: 'left',
  reset: 'input',
  preset: 'default',
  flexGrow: 1,
  margin: 0,
  resize: 'none',
}
