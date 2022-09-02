import React from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { Root } from '@jenga-ui/root';

export function renderWithRoot(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries' | 'wrapper'>,
) {
  return render(ui, { ...options, wrapper: Root });
}

export * from '@testing-library/react';