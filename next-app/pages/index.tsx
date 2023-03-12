import {
  Cell,
  Column,
  Flex,
  Grid,
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
    <Grid
      placeItems={'center'}
      margin={'50px'}
      width={'800px'}
      height={'300px'}
    >
      <Table
        wrapperStyles={{
          width: '800px',
          height: '400px',
          overflow: 'auto',
          styledScrollbar: false,
        }}
        styles={{ width: '100px', height: '100px' }}
        aria-label="Example table with client side sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        showFooter={true}
        customFooter={
          <tfoot>
            <tr>
              <td colSpan={4}>
                <Flex
                  width={'100%'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  Hey
                </Flex>
              </td>
            </tr>
          </tfoot>
        }
        customHeaderRow={
          <tr>
            <td colSpan={4}>
              <Flex
                width={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                Hey
              </Flex>
            </td>
          </tr>
        }
        customHeaderRowPostion={'bottom'}
        headerRowProps={{
          styles: {
            borderBottom: 'none',
          },
        }}
        // showAlternateBody={true}
        // alternateBody={
        //   <tr>
        //     <td colSpan={4}>
        //       <Flex
        //         width={'100%'}
        //         alignItems={'center'}
        //         justifyContent={'center'}
        //       >
        //         Hey
        //       </Flex>
        //     </td>
        //   </tr>
        // }
      >
        <TableHeader>
          <Column
            key="name"
            allowsSorting
            colCellStyles={{ border: '1px solid #afafaf' }}
            styles={{ border: 'none' }}
          >
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
    </Grid>
  );
}

export default Home;
