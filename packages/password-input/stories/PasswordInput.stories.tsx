import { LABEL_ARG } from '../../../storybook/stories/FormFieldArgs';
import { baseProps } from '../../../storybook/stories/lists/baseProps';

import { PasswordInput } from '../src/PasswordInput';

export default {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
  argTypes: {
    ...LABEL_ARG,
  },
};

const Template = (props) => (
  <PasswordInput
    {...props}
    onChange={(query) => console.log('change', query)}
  />
);

export const Default = Template.bind({});
Default.args = {};