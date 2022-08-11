import { Cell, Column, Row, TableBody, TableHeader } from '../src';
import { baseProps } from '../../../stories/lists/baseProps';
import { Table, PaginatedTable } from '../src/';
import { useAsyncList } from '@react-stately/data';
export default {
  title: 'Forms/Table',
  component: Table,
  parameters: {
    controls: {
      exclude: baseProps,
    },
  },
};

const AsyncTableTemplate = (args) => {
  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch(`https://swapi.py4e.com/api/people/?search`, {
        signal,
      });
      let json = await res.json();
      return {
        items: json.results,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
          if (sortDescriptor.direction === 'descending') {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      aria-label="Example table with client side sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      {...args}
    >
      <TableHeader>
        <Column key="name" allowsSorting>
          Name
        </Column>
        <Column key="height" allowsSorting>
          Height
        </Column>
        <Column key="mass" allowsSorting>
          Mass
        </Column>
        <Column key="birth_year" allowsSorting>
          Birth Year
        </Column>
      </TableHeader>
      <TableBody items={list.items}>
        {(item: { name: string }) => (
          <Row key={item.name}>
            {(columnKey) => <Cell>{item[columnKey]}</Cell>}
          </Row>
        )}
      </TableBody>
    </Table>
  );
};
const Template = (args) => (
  <Table
    aria-label="Example static collection table"
    style={{ height: '210px', maxWidth: '400px' }}
    {...args}
  >
    <TableHeader>
      <Column>Name</Column>
      <Column>Type</Column>
      <Column>Date Modified</Column>
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

const NewTemplate = (args) => (
  <Table
    aria-label="Example static collection table"
    style={{ height: '210px', maxWidth: '400px' }}
    {...args}
  >
    <TableHeader>
      <Column dataType="generic">Name</Column>
      <Column dataType="generic" align="center">
        Type
      </Column>
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

const PaginatedAsyncTemplate = (args) => {
  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch(`https://swapi.py4e.com/api/people/?search`, {
        signal,
      });
      let json = await res.json();
      return {
        items: json.results,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
          if (sortDescriptor.direction === 'descending') {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });
  return (
    <PaginatedTable paginate recordsPerPage={3} {...args}>
      <TableHeader>
        <Column key="name" allowsSorting>
          Name
        </Column>
        <Column key="height" allowsSorting>
          Height
        </Column>
        <Column key="mass" allowsSorting>
          Mass
        </Column>
        <Column key="birth_year" allowsSorting>
          Birth Year
        </Column>
      </TableHeader>
      <TableBody items={list.items}>
        {(item: { name: string }) => (
          <Row key={item.name}>
            {(columnKey) => <Cell>{item[columnKey]}</Cell>}
          </Row>
        )}
      </TableBody>
    </PaginatedTable>
  );
};

const PaginatedTemplate = (args) => (
  <PaginatedTable aria-label="Example static collection table" {...args}>
    <TableHeader>
      <Column>Name</Column>
      <Column>Type</Column>
      <Column>Date Modified</Column>
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
  </PaginatedTable>
);

export const Default = Template.bind({});
Default.args = {};
export const WithColumnTypesAndColumnAlignment = NewTemplate.bind({});
WithColumnTypesAndColumnAlignment.args = {};
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

export const AsyncExample = AsyncTableTemplate.bind({});
AsyncExample.args = {};

export const PaginationExample = PaginatedTemplate.bind({});
PaginationExample.args = {
  recordsPerPage: 1,
  paginate: true,
};
