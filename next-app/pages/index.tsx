import { Accordion, AccordionItemContext } from '@jengaui/accordion';
import { Button, Root } from '@jengaui/react';
import { useContext } from 'react';

// import styles from '../styles/Home.module.css';

import type { NextPage } from 'next';

const Extra = () => {
  const ctx = useContext(AccordionItemContext);
  console.log(ctx);
  return (
    <Button onPress={ctx.setExpand}>{ctx.isExpanded ? 'Hide' : 'Show'}</Button>
  );
};

const Home: NextPage = () => {
  return (
    <Root fonts={false}>
      <Button> I'm Button </Button>
    </Root>
  );
};

export default Home;
