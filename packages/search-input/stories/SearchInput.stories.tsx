import { baseProps } from '../../../storybook/stories/lists/baseProps';
import { TEXT_VALUE_ARG } from '../../../storybook/stories/FormFieldArgs';

import { SearchInput } from '../src/SearchInput';

export default {
  title: 'Forms/SearchInput',
  component: SearchInput,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
  argTypes: {
    ...TEXT_VALUE_ARG,
  },
};

const Template = (args) => (
  <SearchInput {...args} onSubmit={(query) => console.log('result', query)} />
);

export const Default = Template.bind({});
Default.args = {};

export const Clearable = Template.bind({});
Clearable.args = {
  isClearable: true,
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = { value: 'Back to the Future' };

export const Invalid = Template.bind({});
Invalid.args = {
  validationState: 'invalid',
};