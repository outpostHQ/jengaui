import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@jengaui/react';

// import styles from '../styles/Home.module.css';
import { useAsyncList } from 'react-stately';

interface Character {
  name: string;
  height: number;
  mass: number;
  birth_year: number;
}

function Home() {
  let list = useAsyncList<Character>({
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
        {(item) => (
          <Row key={item.name}>
            {(columnKey) => <Cell>{item[columnKey]}</Cell>}
          </Row>
        )}
      </TableBody>
    </Table>
  );
}

export default Home;
