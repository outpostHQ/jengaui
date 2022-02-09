import React from 'react'
import { ModalProvider } from '@react-aria/overlays'
import { Button } from '@jenga-ui/button'
import { ButtonGroup } from '@jenga-ui/button-group'
import { Dialog, DialogTrigger } from '../'
import {
  Content,
  Divider,
  Footer,
  Header,
  Paragraph,
  Title,
} from '@jenga-ui/content'

export default {
  title: 'jenga-ui / Atoms / Dialog',
  component: Dialog,
  argTypes: {
    size: {
      control: {
        type: 'inline-radio',
        options: [undefined, 'small', 'medium', 'large'],
      },
      description: 'Type of the dialog',
      defaultValue: undefined,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'small' },
      },
    },
    type: {
      control: {
        type: 'inline-radio',
        options: [
          undefined,
          'modal',
          'popover',
          'tray',
          'fullscreen',
          'fullscreenTakeover',
          'panel',
        ],
      },
      description: 'Type of the dialog',
      defaultValue: undefined,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'modal' },
      },
    },
    mobileType: {
      control: {
        type: 'inline-radio',
        options: [
          undefined,
          'modal',
          'popover',
          'tray',
          'fullscreen',
          'fullscreenTakeover',
        ],
      },
      description: 'Type of the dialog for mobile devices',
      defaultValue: undefined,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'modal' },
      },
    },
    isDismissable: {
      defaultValue: true,
      description: 'Whether the dialog can be dismissed.',
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    placement: {
      control: {
        type: 'inline-radio',
        options: [undefined, 'top', 'bottom'],
      },
      description: 'The default placement of the dialog.',
      defaultValue: undefined,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
    },
  },
}

const Template = ({ size, ...props }: any) => {
  return (
    <ModalProvider>
      <DialogTrigger
        {...props}
        onDismiss={() => {
          console.log('dismiss')
        }}
        // styles={{
        //   transform: {
        //     '': 'translate(100%, 0)',
        //     open: 'translate(0, 0)',
        //   },
        // }}
      >
        <Button margin="30x top">Click me!</Button>
        {(close) => (
          <Dialog
            size={size}
            // styles={{
            //   width: '320px',
            //   placeSelf: 'end',
            //   height: '@jenga-visual-viewport-height',
            // }}
          >
            <Title>Modal title</Title>
            <Header>Header</Header>
            <Divider />
            <Content>
              <Paragraph>Test content</Paragraph>
              <Paragraph>Test content</Paragraph>
            </Content>
            <Footer>Footer</Footer>
            <ButtonGroup>
              <Button onPress={close} type="primary">
                Action
              </Button>
              <Button onPress={close}>Sec</Button>
              <Button onPress={close}>Cancel</Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogTrigger>
    </ModalProvider>
  )
}

export const Default = Template.bind({})
Default.args = {}
