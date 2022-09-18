import { expect } from '@storybook/jest';
import { Meta, Story } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { BellOutlined } from '@ant-design/icons';

import { Button } from '@jengaui/button';

import { Toast } from '../src/Toast';
import { JengaToastsApiProps } from '../src/types';
import { useToastsApi } from '../src/use-toasts-api';

export default {
  title: 'Overlays/Toasts',
  component: Toast,
  args: {
    type: 'success',
    description: 'Copied to clipboard',
  },
} as Meta<JengaToastsApiProps>;

export const UseToast: Story<JengaToastsApiProps> = (args) => {
  const { toast } = useToastsApi();

  return <Button onPress={() => toast({ ...args })}>Click Me!</Button>;
};

UseToast.play = async ({ canvasElement }) => {
  const { getByRole, getByTestId } = within(canvasElement);

  const button = getByRole('button');
  await userEvent.click(button);

  const notification = getByTestId('FloatingNotification');

  await expect(notification).toBeInTheDocument();
};

export const AsComponent: Story<JengaToastsApiProps> = (args) => {
  return <Toast {...args} />;
};

export const AllTypes: Story<JengaToastsApiProps> = () => (
  <>
    <Toast.Success description="Copied to clipboard" />
    <Toast.Danger description="Copied to clipboard" />
    <Toast.Attention description="Copied to clipboard" />
  </>
);

export const CustomIcon = AsComponent.bind({});
CustomIcon.args = {
  icon: <BellOutlined style={{ display: 'flex', alignSelf: 'center' }} />,
};