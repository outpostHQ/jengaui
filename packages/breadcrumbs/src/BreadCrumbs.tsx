import React, { forwardRef } from 'react';
import { useBreadcrumbs } from '@react-aria/breadcrumbs';
import { AriaBreadcrumbsProps } from '@react-types/breadcrumbs';
import { BaseProps, Styles, tasty } from 'tastycss';
export interface JengaBreadCrumbProps extends AriaBreadcrumbsProps, BaseProps {
  listStyles?: Styles;
}
const Nav = tasty({
  as: 'nav',
});
const Ol = tasty({
  as: 'ol',
});

export const Breadcrumbs = forwardRef((props: JengaBreadCrumbProps, ref) => {
  const { listStyles = {} } = props;
  let { navProps } = useBreadcrumbs(props);
  let children = React.Children.toArray(props.children);

  return (
    <Nav {...navProps}>
      <Ol
        styles={{
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          ...listStyles,
        }}
      >
        {children.map((child, i) =>
          React.cloneElement(
            child as React.FunctionComponentElement<{ isCurrent: boolean }>,
            {
              isCurrent: i === children.length - 1,
            },
          ),
        )}
      </Ol>
    </Nav>
  );
});
