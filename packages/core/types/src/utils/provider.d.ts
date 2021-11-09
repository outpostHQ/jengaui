import React from 'react';
import { ForwardedRef, PropsWithChildren } from 'react';
import { ResponsiveStyleValue, Props } from 'tastycss-react';
export interface ProviderProps extends Props {
    breakpoints?: number[];
    insideForm?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    validationState?: string;
    router?: Function;
    styles?: {
        [key: string]: {
            [key: string]: ResponsiveStyleValue;
        } | Function;
    };
    ref?: JSX.Element;
    root?: ForwardedRef<any>;
}
export declare type ProviderInsideProps = Omit<ProviderProps, 'styles' | 'breakpoints'>;
export declare const UIKitContext: React.Context<ProviderInsideProps>;
export declare function Provider(allProps: PropsWithChildren<ProviderProps>): JSX.Element;
export declare function useProviderProps<T extends Props = Props>(props: T): T;
