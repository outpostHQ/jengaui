import React from 'react';
import { Root } from '../packages/core/src/Root';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Root>
      <Story />
    </Root>
  ),
];

export default {
  parameters,
  decorators,
};
