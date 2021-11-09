import React from 'react';
import { ButtonProps } from './ButtonProps';
declare type ProvideStylesProps = Pick<ButtonProps, 'size' | 'type' | 'isDisabled' | 'ghost' | 'isLoading' | 'icon' | 'children'>;
export declare function provideStyles(props: ProvideStylesProps): any;
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<import("@react-types/shared").FocusableRefValue<HTMLElement, HTMLElement>>>;
export default Button;
