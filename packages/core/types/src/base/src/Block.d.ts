import React from 'react';
import { ContainerStyleProps, AllBaseProps } from 'tastycss-react';
export interface BlockProps extends Partial<Omit<AllBaseProps, keyof ContainerStyleProps | 'as'>>, Partial<ContainerStyleProps> {
}
export declare const Block: React.ForwardRefExoticComponent<BlockProps & React.RefAttributes<import("@react-types/shared").FocusableRefValue<HTMLElement, HTMLElement>>>;
