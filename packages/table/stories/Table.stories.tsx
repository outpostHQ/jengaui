import { Cell, Column, Row, TableBody, TableHeader } from '../index';
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
    selectionMode={args.selectionMode}
    style={{ height: '210px', maxWidth: '400px' }}
  >
    <TableHeader>
      <Column>Name</Column>
      <Column>Type</Column>
      <Column>Date Modified</Column>
    </TableHeader>
    <TableBody>
      <Row>
        <Cell>Games</Cell>
        <Cell>File folder</Cell>
        <Cell>6/7/2020</Cell>
      </Row>
      <Row>
        <Cell>Program Files</Cell>
        <Cell>File folder</Cell>
        <Cell>4/7/2021</Cell>
      </Row>
      <Row>
        <Cell>bootmgr</Cell>
        <Cell>System file</Cell>
        <Cell>11/20/2010</Cell>
      </Row>
      <Row>
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
WithSelection.args = { selectionMode: 'multiple' };
