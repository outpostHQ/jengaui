import { baseProps } from '../../../storybook/stories/lists/baseProps';

import { Banner } from '../src/Banner';

export default {
  title: 'Overlays/Banner',
  component: Banner,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
  argTypes: {
    label: {
      defaultValue: 'Banner text',
      control: 'text',
    },
  },
};

const Template = ({ type, label }) => (
  <Banner type={type}>{label}</Banner>
);

export const Note = Template.bind({});
Note.args = {
  type: 'note',
  label: 'Banner text',
};

export const Danger = Template.bind({});
Danger.args = {
  type: 'danger',
  label: 'Banner text',
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  label: 'Banner text',
};