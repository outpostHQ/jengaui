import { Slider } from '../src/Slider';
const Template = ({ label }) => <Slider label={label} />;
export default {
  title: 'Content/Slider',
  component: Slider,
  argTypes: {
    label: {
      type: { summary: 'string' },
      defaultValue: { summary: 'opacity' },
    },
  },
};
export const Default = Template.bind({});
Default.args = { label: 'veracity' };
