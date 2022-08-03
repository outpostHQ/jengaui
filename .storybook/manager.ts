import { addons } from '@storybook/addons';

import { create } from '@storybook/theming';

const basicTheme = create({
  base: 'light',
  brandTitle: 'Jenga-UI',
});

addons.setConfig({
  theme: basicTheme,
});
