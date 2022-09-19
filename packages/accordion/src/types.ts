import { JengaFlexProps } from '@jengaui/layout';
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

export type AccordionDetailsProps = BasePropsWithoutChildren &
  JengaFlexProps & {
    children: AccordionItemProps['children'];
    isLazy?: boolean;
    isExpanded?: boolean;
  };
export type AccordionItemTitleProps = BaseProps & {
  title: AccordionItemProps['title'];
  extra: AccordionItemProps['extra'];
  onExpand: () => void;
  isExpanded: boolean;
  contentID: string;
  titleID: string;
  isIconVisible: boolean;
  titleWrapperProps: BasePropsWithoutChildren;
  disclosureIcon?: ReactElement;
};
