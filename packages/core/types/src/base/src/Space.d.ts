import React from 'react';
import { BaseProps, ContainerStyleProps, Styles } from 'tastycss-react';
declare type ShortItemsStyles = {
    align?: Styles['alignItems'];
    justify?: Styles['justifyItems'];
};
export interface SpaceProps extends BaseProps, Partial<ContainerStyleProps>, Partial<ShortItemsStyles> {
    direction?: 'vertical' | 'horizontal';
}
export declare const Space: React.ForwardRefExoticComponent<SpaceProps & React.RefAttributes<import("@react-types/shared").FocusableRefValue<HTMLElement, HTMLElement>>>;
export {};
