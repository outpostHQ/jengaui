import React, { forwardRef, ReactNode, RefObject } from 'react';
import { useBreadcrumbItem } from '@react-aria/breadcrumbs';
import { useCombinedRefs } from '@jenga-ui/utils';
import { AriaBreadcrumbItemProps } from '@react-types/breadcrumbs';
import { FocusableElement } from '@react-types/shared';
import { useProviderProps } from '@jenga-ui/providers';
import { BasePropsWithoutChildren, Styles, tasty } from 'tastycss';
export interface JengaBreadCrumbItemProps
  extends AriaBreadcrumbItemProps,
    BasePropsWithoutChildren {
  separator?: ReactNode | string;
  liStyles?: Styles;
  href?: string;
  target?: string;
}
const Element = tasty({});
const Li = tasty(Element, { as: 'li' });
export const BreadcrumbItem = forwardRef(
  (props: JengaBreadCrumbItemProps, ref) => {
    const defaultSeparator = (
      <span aria-hidden="true" style={{ padding: '0 5px' }}>
        {'>'}
      </span>
    );
    props = useProviderProps(props);
    const {
      elementType = 'a',
      styles = {},
      mods = {},
      liStyles = {},
      separator = defaultSeparator,
    } = props;
    let nmods = {
      disabled: props.isDisabled,
      current: props.isCurrent,
      ...mods,
    };
    ref = useCombinedRefs([ref, React.useRef(null)]);
    let { itemProps } = useBreadcrumbItem(
      { ...props, elementType: elementType },
      ref as RefObject<FocusableElement>,
    );
    console.log(itemProps);

    const anchorProps =
      elementType === 'a'
        ? { href: props.href ?? '', target: props.target ?? '' }
        : {};
    return (
      <Li mods={nmods} styles={liStyles}>
        <Element
          as={elementType}
          mods={nmods}
          {...anchorProps}
          {...itemProps}
          ref={ref}
          styles={{
            color: {
              '': 'inherit',
              disabled: '#lightgrey',
              current: '#primary',
            },
            textDecoration: {
              '': 'underline',
              current: 'none',
              disabled: 'none',
            },
            fontWeight: {
              '': null,
              current: 'bold',
            },
            fontSize: {
              '': '1em',
            },
            cursor: {
              '': 'pointer',
              current: 'default',
              disabled: 'default',
            },
            ...styles,
          }}
        >
          {props.children}
        </Element>
        {!props.isCurrent && (
          <span aria-hidden="true" style={{ padding: '0 5px' }}>
            {separator}
          </span>
        )}
      </Li>
    );
  },
);
