import { baseProps } from '../../../storybook/stories/lists/baseProps';

import { Placeholder } from '../src/Placeholder';

export default {
  title: 'Content/Placeholder',
  component: Placeholder,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
};

const Template = (args) => <Placeholder {...args} />;

export const Box = Template.bind({});
Box.args = {};

export const BigBox = Template.bind({});
BigBox.args = {
  height: '6x',
};

export const Circle = Template.bind({});
Circle.args = {
  circle: true,
  size: '6x',
};