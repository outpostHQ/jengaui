import { tasty } from 'tastycss';

import { AccordionProvider } from './AccordionProvider';
import { AccordionProps } from './types';
import { AccordionItem } from './AccordionItem';

const StyledAccordion = tasty({
  styles: { display: 'flex', width: '100%', flow: 'column' },
});

export function Accordion(props: AccordionProps) {
  const { children, isLazy } = props;

  return (
    <AccordionProvider isLazy={isLazy}>
      <StyledAccordion>{children}</StyledAccordion>
    </AccordionProvider>
  );
}

Accordion.Item = AccordionItem;
