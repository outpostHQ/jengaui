import { TooltipTrigger, Tooltip } from '../../tooltip';
import { baseProps } from '../../../storybook/stories/lists/baseProps';

import { ActiveZone } from '../src/ActiveZone';

export default {
  title: 'Content/ActiveZone',
  component: ActiveZone,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
};

const Template = ({ isDisabled, label }) => (
  <ActiveZone isDisabled={isDisabled}>{label}</ActiveZone>
);

const TooltipTemplate = ({ isDisabled, label }) => (
  <TooltipTrigger>
    <ActiveZone isDisabled={isDisabled}>{label}</ActiveZone>
    <Tooltip>Tooltip</Tooltip>
  </TooltipTrigger>
);

export const Default = Template.bind({});
Default.args = {
  label: 'ActiveZone',
};

export const WithTooltip = TooltipTemplate.bind({});
WithTooltip.args = {
  label: 'ActiveZone',
};
