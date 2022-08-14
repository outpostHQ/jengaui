import { Cell, Column, Row, TableBody, TableHeader } from '../src';
import { baseProps } from '../../../stories/lists/baseProps';
import { Table as NewTable } from '../src/';
import { useAsyncList } from '@react-stately/data';
export default {
  title: 'Forms/Table',
  component: NewTable,
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
    <NewTable
      aria-label="Example table with client side sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      stickyHeader
      {...args}
    >
      <TableHeader>
        <Column
          key="name"
          align={'left'}
          allowsSorting
          styles={{ position: 'sticky', insetInlineStart: 0, fill: '#fff' }}
        >
          Name
        </Column>
        <Column key="height" dataType={'numeric'} allowsSorting>
          Height
        </Column>
        <Column key="mass" dataType={'numeric'} allowsSorting>
          Mass
        </Column>
        <Column key="birth_year" dataType={'date'} allowsSorting>
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
    </NewTable>
  );
};
const Template = (args) => (
  <NewTable aria-label="Example static collection table" {...args}>
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
  </NewTable>
);

const NewTemplate = (args) => (
  <NewTable
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
  </NewTable>
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
    <NewTable paginated recordsPerPage={3} {...args}>
      <TableHeader>
        <Column key="name" align={'left'} allowsSorting>
          Name
        </Column>
        <Column key="height" dataType={'numeric'} allowsSorting>
          Height
        </Column>
        <Column key="mass" dataType={'numeric'} allowsSorting>
          Mass
        </Column>
        <Column key="birth_year" dataType={'date'} allowsSorting>
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
    </NewTable>
  );
};

const PaginatedTemplate = (args) => (
  <NewTable paginated aria-label="Example static collection table" {...args}>
    <TableHeader>
      <Column>Name</Column>
      <Column styles={{ borderLeft: '1px solid green' }}>Type</Column>
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
  </NewTable>
);

export const Default = Template.bind({});
Default.args = {};
export const WithZebraStripes = Template.bind({});
WithZebraStripes.args = { zebraStripes: true };
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

export const WithStickyHeaderAndScrolling = AsyncTableTemplate.bind({});
WithStickyHeaderAndScrolling.args = {
  isVirtualized: true,
};
export const PaginationExample = PaginatedTemplate.bind({});
PaginationExample.args = {
  recordsPerPage: 3,
  bodyStyles: {
    background: '#fff',
  },
};
const EmptyTemplate = (args) => (
  <NewTable {...args}>
    <TableHeader>
      <Column>Name</Column>
      <Column>Type</Column>
      <Column>Size</Column>
    </TableHeader>
    <TableBody>{[]}</TableBody>
  </NewTable>
);

export const WithEmpty = EmptyTemplate.bind({});
WithEmpty.args = {
  IsEmpty: <div>HEllo</div>,
};
export const PaginationAsyncExample = PaginatedAsyncTemplate.bind({});
PaginationAsyncExample.args = {
  recordsPerPage: 3,
};
