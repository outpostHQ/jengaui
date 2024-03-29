import { useMenuSection } from '@react-aria/menu';

import { MenuItem, MenuItemProps } from './MenuItem';
import {
  StyledMenu,
  StyledMenuSection,
  StyledMenuSectionHeading,
} from './styled';

export type JengaMenuSectionProps<T> = MenuItemProps<T>;

/** @private */
export function MenuSection<T>(props: JengaMenuSectionProps<T>) {
  const { item, state, onAction } = props;
  const heading = item.rendered;
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading,
    'aria-label': item['aria-label'],
  });

  return (
    <>
      <StyledMenuSection {...itemProps}>
        {heading && (
          <StyledMenuSectionHeading {...headingProps}>
            {heading}
          </StyledMenuSectionHeading>
        )}
        <StyledMenu {...groupProps} mods={{ section: true }}>
          {[...item.childNodes].map((node) => {
            let item = (
              <MenuItem
                key={node.key}
                item={node}
                state={state}
                onAction={onAction}
              />
            );

            if (node.wrapper) {
              item = node.wrapper(item);
            }

            return item;
          })}
        </StyledMenu>
      </StyledMenuSection>
    </>
  );
}
