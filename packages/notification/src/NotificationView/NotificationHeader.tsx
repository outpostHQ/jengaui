import { HTMLAttributes, memo } from 'react';

import { Title } from '@jenga-ui/content';
import { tasty } from 'tastycss';

import { NotificationProps } from './types';

export type NotificationHeaderProps = {
  header: NotificationProps['header'];
} & HTMLAttributes<HTMLElement>;

const Header = tasty(Title, {
  as: 'div',
  preset: 'h6',
  styles: {
    gridArea: 'header',
    cursor: 'default',

    '&:not(:empty)': {
      margin: '0.25x 0 0.5x',
    },
  },
});

export const NotificationHeader = memo(function NotificationHeader(
  props: NotificationHeaderProps,
): JSX.Element {
  const { header, ...headerProps } = props;

  return <Header {...headerProps}>{header}</Header>;
});