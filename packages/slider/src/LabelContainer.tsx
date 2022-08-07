import { Block } from '@jenga-ui/core';
import { tasty } from 'tastycss';

export const LabelContainer = tasty(Block, {
  styles: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
