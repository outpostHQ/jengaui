import { useCallback, useRef, useState } from 'react';
import { tasty } from 'tastycss';

import { useUniqID } from './use-unique-id';

import { AccordionDetails } from './AccordionDetails';
import { AccordionItemTitle } from './AccordionItemTitle';
import { AccordionItemProps } from './types';
import { useAccordionContext } from './AccordionProvider';

const StyledAccordionItemContent = tasty({
  styles: { borderBottom: '1bw solid #dark-05', overflow: 'hidden' },
});

export function AccordionItem(props: AccordionItemProps) {
  const { isDefaultExpanded = false, extra, title, children } = props;

  const contentRef = useRef<HTMLElement>(null);

  const { isLazy } = useAccordionContext();
  const [expanded, setExpanded] = useState(isDefaultExpanded);
  const onExpand = useCallback(() => setExpanded((current) => !current), []);
  const contentID = useUniqID();
  const titleID = useUniqID();

  return (
    <>
      <AccordionItemTitle
        titleID={titleID}
        contentID={contentID}
        isExpanded={expanded}
        title={title}
        extra={extra}
        onExpand={onExpand}
      />

      <StyledAccordionItemContent
        ref={contentRef}
        id={contentID}
        role="region"
        aria-labelledby={titleID}
        mods={{ expanded }}
      >
        <AccordionDetails isLazy={isLazy} isExpanded={expanded}>
          {children}
        </AccordionDetails>
      </StyledAccordionItemContent>
    </>
  );
}
