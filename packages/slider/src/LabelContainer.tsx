import { Block } from '@jengaui/core';
import { tasty } from 'tastycss';

export const LabelContainer = tasty(Block, {
  styles: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.1em',
  },
});
