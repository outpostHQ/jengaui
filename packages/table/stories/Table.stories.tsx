import { ColumnProps } from '@react-stately/table';
import { Cell, Column, Row, TableBody, TableHeader } from '../src';
import { baseProps } from '../../../stories/lists/baseProps';
import { Table } from '../src/';
export default {
  title: 'Forms/Table',
  component: Table,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
};

const Template = (args) => (
  <Table
    aria-label="Example static collection table"
    style={{ height: '210px', maxWidth: '400px' }}
    {...args}
  >
    <TableHeader>
      <Column align={'right'}>Name</Column>
      <Column>Type</Column>
      <Column dataType="date">Date Modified</Column>
    </TableHeader>
    <TableBody>
      <Row key={'r.1'}>
        <Cell>Games</Cell>
        <Cell>File folder</Cell>
        <Cell>6/7/2020</Cell>
      </Row>
      <Row key={'r.2'}>
        <Cell>Program Files</Cell>
        <Cell>File folder</Cell>
        <Cell>4/7/2021</Cell>
      </Row>
      <Row key={'r.3'}>
        <Cell>bootmgr</Cell>
        <Cell>System file</Cell>
        <Cell>11/20/2010</Cell>
      </Row>
      <Row key={'r.4'}>
        <Cell>log.txt</Cell>
        <Cell>Text Document</Cell>
        <Cell>1/18/2016</Cell>
      </Row>
    </TableBody>
  </Table>
);

export const Default = Template.bind({});
Default.args = {};
export const WithSelection = Template.bind({});
WithSelection.args = { selectionMode: 'single' };
export const WithMultipleSelection = Template.bind({});
WithMultipleSelection.args = { selectionMode: 'multiple' };
export const WithReplaceBehavior = Template.bind({});
WithReplaceBehavior.args = {
  selectionMode: 'single',
  selectionBehavior: 'replace',
};
export const WithMultipleSelectionAndReplaceBehavior = Template.bind({});
WithMultipleSelectionAndReplaceBehavior.args = {
  selectionMode: 'multiple',
  selectionBehavior: 'replace',
};
export const WithDefaultSelection = Template.bind({});
WithDefaultSelection.args = {
  selectionMode: 'single',
  defaultSelectedKeys: ['r.1'],
  disallowEmptySelection: true,
};
