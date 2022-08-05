import { tasty } from 'tastycss';

export const Track = tasty({
  styles: {
    '&:before': {
      content: 'attr(x)',
      display: 'block',
      position: 'absolute',
      fill: { '': '#primary', disabled: '#light-grey.60' },
      height: {
        horizontal: '3px',
        vertical: '100%',
      },
      width: {
        horizontal: '100%',
        vertical: '3px',
      },
      top: {
        '': 'initial',
        horizontal: '50%',
      },
      left: {
        '': 'initial',
        vertical: '50%',
      },
    },
    height: {
      '': '20px',
      horizontal: '30px',
      vertical: '100%',
    },
    width: {
      horizontal: '100%',
      vertical: '30px',
    },
  },
});
