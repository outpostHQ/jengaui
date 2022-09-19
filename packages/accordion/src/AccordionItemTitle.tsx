import { memo, ReactElement, ReactNode, ReactText } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import { BaseProps, BasePropsWithoutChildren, Element, tasty } from 'tastycss';
import { Text } from '@jengaui/content';
import { mergeProps } from '@jengaui/utils';
import { DownOutlined } from '@ant-design/icons';

import { AccordionItemProps } from './types';

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

const StyledAccordionItemTitleWrap = tasty<
  BasePropsWithoutChildren & Omit<Omit<HTMLElement, 'children'>, 'style'>
>(Element, {
  role: 'button',
  tabIndex: 0,
  styles: {
    display: 'flex',
    width: '100%',
    borderRadius: { '': 0, focused: '0.5x' },
    outline: { '': '#purple-04.0', focused: '#purple-04' },
  },
});

const StyledAccordionItemTitle = memo(
  tasty<BaseProps>(Element, {
    styles: {
      display: 'grid',
      width: '100%',
      gridTemplateAreas: '"icon . title ."',
      gridTemplateColumns: '2x 1x auto 1fr',
      alignItems: 'center',
      padding: '1.75x 1x 1.75x 0',
      cursor: 'pointer',
      userSelect: 'none',
    },
  }),
);
const TitleSection = tasty<BaseProps>(Element, {
  styles: { gridArea: 'title' },
});
const ExtraSection = tasty<BaseProps>(Element, {
  styles: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5x right',
  },
});

const ExpandDownOutlinedSection = tasty<BaseProps>(Element, {
  styles: {
    gridArea: 'icon',
    width: '2x',
    height: '2x',
    transform: { '': 'rotate(-90deg)', expanded: 'rotate(0deg)' },
    transition: 'transform 0.2s ease-out',
    transformOrigin: 'center',
  },
});

export function AccordionItemTitle(props: AccordionItemTitleProps) {
  const {
    title,
    extra,
    onExpand,
    isExpanded,
    contentID,
    titleID,
    isIconVisible,
    titleWrapperProps,
    disclosureIcon,
    ...baseProps
  } = props;

  const { hoverProps } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing({});
  const { pressProps } = usePress({ onPress: onExpand });

  return (
    <StyledAccordionItemTitleWrap
      {...mergeProps(hoverProps, focusProps, pressProps)}
      mods={{ focused: isFocusVisible }}
      aria-expanded={isExpanded}
      aria-controls={contentID}
      aria-labelledby={titleID}
      {...titleWrapperProps}
    >
      <StyledAccordionItemTitle {...baseProps}>
        {isIconVisible
          ? disclosureIcon ?? <AccordionItemIcon isExpanded={isExpanded} />
          : null}
        <AccordionItemContent title={title} id={titleID} />
      </StyledAccordionItemTitle>
      <AccordionItemExtra>{extra}</AccordionItemExtra>
    </StyledAccordionItemTitleWrap>
  );
}

const AccordionItemIcon = memo(function StyledAccordionItemIcon(props: {
  isExpanded: boolean;
}) {
  const { isExpanded } = props;

  return (
    <ExpandDownOutlinedSection mods={{ expanded: isExpanded }}>
      <DownOutlined />
    </ExpandDownOutlinedSection>
  );
});

const AccordionItemContent = memo(function AccordionItemContent(props: {
  id: string;
  title: ReactText;
}) {
  const { id, title } = props;

  return (
    <TitleSection id={id}>
      <Text key="text" preset="t3s">
        {title}
      </Text>
    </TitleSection>
  );
});

const AccordionItemExtra = memo(function AccordionItemExtra(props: {
  children: ReactNode;
}) {
  if (!props.children) {
    return null;
  }

  return <ExtraSection>{props.children}</ExtraSection>;
});
