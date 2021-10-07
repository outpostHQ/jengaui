import { FocusProps, FocusResult } from '@react-aria/interactions';
export declare const useFocus: ({ isDisabled }: FocusProps, onlyVisible?: boolean) => {
    focusProps: FocusResult['focusProps'];
    isFocused: boolean;
};
