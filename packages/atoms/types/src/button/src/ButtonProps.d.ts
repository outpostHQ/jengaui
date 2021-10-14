import { ActionProps } from '@numl-react/action';
export interface ButtonProps extends ActionProps {
    ghost?: boolean;
    icon?: JSX.Element;
    isLoading?: boolean;
    isSelected?: boolean;
    type?: 'primary' | 'default' | 'danger' | 'link' | 'clear' | 'outline' | 'tab' | 'item';
}
