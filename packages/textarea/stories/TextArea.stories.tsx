import { DollarCircleOutlined } from '@ant-design/icons';

import { baseProps } from '../../../storybook/stories/lists/baseProps';
import { TEXT_VALUE_ARG } from '../../../storybook/stories/FormFieldArgs';

import { TextArea } from '../src/TextArea';

export default {
  title: 'Forms/TextArea',
  component: TextArea,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
  argTypes: {
    ...TEXT_VALUE_ARG,
  },
};

const Template = ({ icon, ...props }) => (
  <TextArea
    icon={icon ? <DollarCircleOutlined /> : null}
    {...props}
    onChange={(query) => console.log('change', query)}
  />
);

export const Default = Template.bind({});
Default.args = {};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = { defaultValue: 'default value' };

export const WithIcon = Template.bind({});
WithIcon.args = { icon: true };

export const Password = Template.bind({});
Password.args = { icon: true, type: 'password' };