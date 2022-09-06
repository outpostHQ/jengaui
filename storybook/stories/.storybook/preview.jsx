import React from 'react';
import { Root } from '@jenga-ui/react';

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