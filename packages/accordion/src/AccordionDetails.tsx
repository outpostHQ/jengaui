import { memo, ReactNode, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Flex } from '@jengaui/layout';
import styled from 'styled-components';
import { useLayoutEffect } from '@jengaui/utils';

import { AccordionDetailsProps } from './types';

const ACCORDION_CONTENT_HEIGHT_VARIABLE = '--__accordion-content-height__';
const ANIMATION_TIMEOUT = 180;

const AccordionDetailsContent = memo(styled.div<{ expanded: boolean }>`
  ${ACCORDION_CONTENT_HEIGHT_VARIABLE}: 0;

  height: ${({ expanded }) => (expanded ? 'auto' : '0')};
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};

  transition-property: height, opacity;
  transition-duration: ${ANIMATION_TIMEOUT}ms;
  transition-timing-function: cubic-bezier(0.42, 0.7, 0.82, 1);

  &.jenga-accordion-transition {
    &-enter {
      opacity: 0;
      height: 0;
      contain: size layout style paint;
      will-change: height, opacity;
    }
    &-enter-active {
      opacity: 1;
      height: var(--__accordion-content-height__);
      contain: size layout style paint;
      will-change: height, opacity;
    }
    &-exit {
      opacity: 1;
      height: var(--__accordion-content-height__);
      contain: size layout style paint;
      will-change: height, opacity;
    }
    &-exit-active {
      opacity: 0;
      height: 0;
      contain: size layout style paint;
      will-change: height, opacity;
    }
  }
`);

export const AccordionDetails = memo(function AccordionDetails(
  props: AccordionDetailsProps,
): JSX.Element {
  const { children, isLazy, isExpanded, ...baseProps } = props;

  const [innerExpandingState, setInnerExpandingState] = useState<
    'expanded' | 'collapsed' | 'collapsing' | 'expanding'
  >(isExpanded ? 'expanded' : 'collapsed');

  const accordionContentRef = useRef<HTMLElement>(null);
  const isLazyChildren = isLazy || typeof children === 'function';

  const content = (() => {
    if (isLazyChildren) {
      if (isExpanded || innerExpandingState === 'collapsing') {
        return renderChildren(children);
      }

      if (innerExpandingState === 'collapsed') {
        return null;
      }
    }

    return renderChildren(children);
  })();

  //  https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85

  useLayoutEffect(() => {
    accordionContentRef.current?.style.setProperty(
      ACCORDION_CONTENT_HEIGHT_VARIABLE,
      `${accordionContentRef.current.scrollHeight}px`,
    );
  }, [isExpanded]);

  return (
    <CSSTransition
      in={isExpanded}
      timeout={ANIMATION_TIMEOUT}
      classNames="jenga-accordion-transition"
      onEnter={() => setInnerExpandingState('expanding')}
      onEntered={() => setInnerExpandingState('expanded')}
      onExiting={() => setInnerExpandingState('collapsing')}
      onExited={() => setInnerExpandingState('collapsed')}
    >
      <AccordionDetailsContent ref={accordionContentRef} expanded={isExpanded}>
        <Flex padding="1x 3x 3x" gap="0" flow="column" {...baseProps}>
          {content}
        </Flex>
      </AccordionDetailsContent>
    </CSSTransition>
  );
});

function renderChildren(
  children: AccordionDetailsProps['children'],
): ReactNode {
  return typeof children === 'function' ? children() : children;
}
