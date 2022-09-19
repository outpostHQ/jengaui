import { BaseProps, Element, tasty } from 'tastycss';

import { AccordionProvider } from './AccordionProvider';
import { AccordionProps } from './types';
import { AccordionItem } from './AccordionItem';

const StyledAccordion = tasty<BaseProps>(Element, {
  styles: { display: 'flex', width: '100%', flow: 'column' },
});

export function Accordion(props: AccordionProps) {
  const { children, isLazy, ...baseProps } = props;

  return (
    <AccordionProvider isLazy={isLazy}>
      <StyledAccordion {...baseProps}>{children}</StyledAccordion>
    </AccordionProvider>
  );
}

Accordion.Item = AccordionItem;
