import { PropsWithChildren, ReactElement, ReactNode, ReactText } from 'react';
import { BaseProps, BasePropsWithoutChildren } from 'tastycss';

export type AccordionProps = BaseProps & {
  children:
    | ReactElement<AccordionItemProps>
    | ReactElement<AccordionItemProps>[];
  isLazy?: boolean;
};
export type AccordionContextType = { isLazy?: boolean };
export type AccordionProviderProps = PropsWithChildren<{ isLazy?: boolean }>;
export type AccordionItemProps = BaseProps & {
  title: ReactText;
  children: ReactNode | (() => ReactNode);
  isDefaultExpanded?: boolean;
  extra?: ReactNode;
  isIconVisible?: boolean;
  titleWrapperProps?: BasePropsWithoutChildren;
  itemTitleProps?: BasePropsWithoutChildren;
  contentWrapperProps?: BasePropsWithoutChildren;
  disclosureIcon?: ReactElement;
};
