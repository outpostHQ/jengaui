import { PropsWithChildren, ReactElement, ReactNode, ReactText } from 'react';

export type AccordionProps = {
  children:
    | ReactElement<AccordionItemProps>
    | ReactElement<AccordionItemProps>[];
  isLazy?: boolean;
};
export type AccordionContextType = { isLazy?: boolean };
export type AccordionProviderProps = PropsWithChildren<{ isLazy?: boolean }>;
export type AccordionItemProps = {
  title: ReactText;
  children: ReactNode | (() => ReactNode);
  isDefaultExpanded?: boolean;
  extra?: ReactNode;
};
