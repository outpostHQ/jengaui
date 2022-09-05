import type { NextPage } from 'next';

import { Avatar, Block, Root, Slider, Button  } from '@jenga-ui/react';


import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div>
      <Root>
      <h1> Hello! </h1>
      <Block> This is Jenga-UI </Block>
      <Avatar icon={null}> OP </Avatar>
      <Button> I'm Button </Button>
      <Slider></Slider>
      </Root>
    </div>
  );
};

export default Home;
