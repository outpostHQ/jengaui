import {
  JengaTextProps,
  Text,
  JengaTitleProps,
  Title,
  JengaParagraphProps,
  Paragraph,
} from '@jengaui/content';

// generic components
export { Base, Block } from '@jengaui/core';
export type { JengaBlockProps } from '@jengaui/core';
export * from '@jengaui/core';
export { TOKENS, GlobalStyles } from '@jengaui/core';
export { ActiveZone } from '@jengaui/active-zone';
export type { JengaActiveZoneProps } from '@jengaui/active-zone';
export * from '@jengaui/copy-snippet';
export { Grid, Flex, Space, Flow, Prefix, Suffix } from '@jengaui/layout';
export type {
  JengaGridProps,
  JengaFlexProps,
  JengaSpaceProps,
  JengaFlowProps,
  JengaPrefixProps,
  JengaSuffixProps,
} from '@jengaui/layout';
export { Link } from '@jengaui/link';
export { Root } from '@jengaui/root';
export type { JengaRootProps } from '@jengaui/root';
export { PrismCode } from '@jengaui/prism-code';
export type { JengaPrismCodeProps } from '@jengaui/prism-code';
export { Divider, Content, Header, Footer } from '@jengaui/content';
export type {
  JengaDividerProps,
  JengaContentProps,
  JengaHeaderProps,
  JengaFooterProps,
} from '@jengaui/content';
export {
  GridProvider,
  useContextStyles,
  StyleProvider,
  Provider,
} from '@jengaui/providers';
export type {
  JengaGridProviderProps,
  useProviderProps,
} from '@jengaui/providers';
export { Result } from '@jengaui/result';
export type { JengaResultProps, JengaResultStatus } from '@jengaui/result';
export { FieldWrapper } from '@jengaui/form';
export type { JengaFieldWrapperProps } from '@jengaui/form';

// atoms
export { Card } from '@jengaui/card';
export type { JengaCardProps } from '@jengaui/card';
export * from '@jengaui/button';
export { Placeholder } from '@jengaui/placeholder';
export type { JengaPlaceholderProps } from '@jengaui/placeholder';
export { Skeleton } from '@jengaui/skeleton';
export type { JengaSkeletonProps } from '@jengaui/skeleton';
export { Badge } from '@jengaui/badge';
export type { JengaBadgeProps } from '@jengaui/badge';
export { Tag } from '@jengaui/tag';
export type { JengaTagProps } from '@jengaui/tag';
export { SearchInput } from '@jengaui/search-input';
export type { JengaSearchInputProps } from '@jengaui/search-input';
export { Submit } from '@jengaui/button';
export type { JengaTextInputBaseProps } from '@jengaui/text-input';
export type { JengaTextInputBaseProps as JengaTextInputProps } from '@jengaui/text-input';
export { TextInput } from '@jengaui/text-input';
export { TextArea } from '@jengaui/textarea';
export type { JengaTextAreaProps } from '@jengaui/textarea';
export { FileInput } from '@jengaui/file-input';
export type { JengaFileInputProps } from '@jengaui/file-input';
export { PasswordInput } from '@jengaui/password-input';
export { Checkbox, CheckboxGroup } from '@jengaui/checkbox';
export type {
  JengaCheckboxProps,
  JengaCheckboxGroupProps,
} from '@jengaui/checkbox';
export { Switch } from '@jengaui/switch';
export type { JengaSwitchProps } from '@jengaui/switch';
export { Radio } from '@jengaui/radio';
export type { JengaRadioProps, JengaRadioGroupProps } from '@jengaui/radio';
export * from '@jengaui/combo-box';
export { Menu, MenuTrigger } from '@jengaui/menu';
export type { JengaMenuProps, JengaMenuTriggerProps } from '@jengaui/menu';
export { Select, ListBoxPopup } from '@jengaui/select';
export type { JengaSelectProps, JengaSelectBaseProps } from '@jengaui/select';
export { NumberInput } from '@jengaui/number-input';
export type { JengaNumberInputProps } from '@jengaui/number-input';
export { Avatar } from '@jengaui/avatar';
export type { JengaAvatarProps } from '@jengaui/avatar';
export * from '@jengaui/dialog';
export { Tooltip, TooltipTrigger, TooltipProvider } from '@jengaui/tooltip';
export type {
  JengaTooltipProps,
  JengaTooltipTriggerProps,
  JengaTooltipProviderProps,
} from '@jengaui/tooltip';

export * from '@jengaui/alert';

// molecules
export { LegacyTabs } from '@jengaui/tabs';
export type { JengaTabsProps } from '@jengaui/tabs';
export { Modal } from '@jengaui/modal';
export type { JengaModalProps } from '@jengaui/modal';
export { AlertDialog, useAlertDialogAPI } from '@jengaui/alert-dialog';
export type { JengaAlertDialogProps } from '@jengaui/alert-dialog';

// services
export { banner } from '@jengaui/services';
export type { JengaBannerOptions } from '@jengaui/services';

export const Typography = {
  Text,
  Title,
  Paragraph,
};

export { Text, Title, Paragraph };
export type { JengaTextProps, JengaTitleProps, JengaParagraphProps };

export { Portal } from '@jengaui/portal';
export type { PortalProps } from '@jengaui/portal';
export * from '@jengaui/form';

export * from '@jengaui/utils';

export * from '@jengaui/notification';
export * from '@jengaui/banner';
export * from '@jengaui/toast';
export * from '@jengaui/slider';
export * from '@jengaui/table';
export * from '@jengaui/breadcrumbs';
export * from '@jengaui/accordion';
