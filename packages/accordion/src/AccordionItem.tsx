import { createContext, RefObject, useCallback, useRef, useState } from 'react';
import { BaseProps, Element, tasty } from 'tastycss';
import { Flex } from '@jengaui/layout';

import { useUniqID } from './use-unique-id';
import { AccordionDetails } from './AccordionDetails';
import { AccordionItemTitle } from './AccordionItemTitle';
import { AccordionItemProps } from './types';
import { useAccordionContext } from './AccordionProvider';

const StyledAccordionItemContent = tasty<
  BaseProps & { ref: RefObject<HTMLElement> }
>(Element, {
  styles: { borderBottom: '1bw solid #dark-05', overflow: 'hidden' },
});
export const AccordionItemContext = createContext<{
  isExpanded: boolean;
  setExpand: () => void;
}>({
  isExpanded: false,
  setExpand: () => {},
});
export function AccordionItem(props: AccordionItemProps) {
  let {
    isDefaultExpanded = false,
    extra,
    title,
    children,
    mods,
    isIconVisible = true,
    itemTitleProps = {},
    titleWrapperProps = {},
    contentWrapperProps = {},
    contentProps = {},
    disclosureIcon,
    ...remBaseProps
  } = props;
  const contentRef = useRef<HTMLElement>(null);
  const { isLazy } = useAccordionContext();
  const [expanded, setExpanded] = useState(isDefaultExpanded);
  const onExpand = useCallback(() => setExpanded((current) => !current), []);
  const contentID = useUniqID();
  const titleID = useUniqID();
  return (
    <AccordionItemContext.Provider
      value={{ isExpanded: expanded, setExpand: onExpand }}
    >
      <Flex flow={'column'} width={'100%'} {...remBaseProps}>
        <AccordionItemTitle
          titleWrapperProps={titleWrapperProps}
          titleID={titleID}
          contentID={contentID}
          isExpanded={expanded}
          title={title}
          extra={extra}
          isIconVisible={isIconVisible}
          disclosureIcon={disclosureIcon}
          onExpand={onExpand}
          {...itemTitleProps}
        />

        <StyledAccordionItemContent
          ref={contentRef}
          id={contentID}
          role="region"
          aria-labelledby={titleID}
          mods={{ expanded: expanded, ...mods }}
          {...contentWrapperProps}
        >
          <AccordionDetails
            isLazy={isLazy}
            isExpanded={expanded}
            {...contentProps}
          >
            {children}
          </AccordionDetails>
        </StyledAccordionItemContent>
      </Flex>
    </AccordionItemContext.Provider>
  );
}
