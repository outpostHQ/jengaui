interface PropsFilterOptions {
    labelable?: boolean;
    propNames?: Set<string>;
    eventProps?: boolean;
}
/**
 * Filters out all props that aren't valid DOM props or defined via override prop obj.
 * @param props - The component props to be filtered.
 * @param opts - Props to override.
 */
export declare function filterBaseProps(props: any, opts?: PropsFilterOptions): {};
export {};
