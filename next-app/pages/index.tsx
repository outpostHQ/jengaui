import type { NextPage } from 'next';

import { Avatar, Block, Root } from '@jenga-ui/react';


import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div>
      <Root>
      <h1> hello</h1>
      <Block> and it is this</Block>
      <Avatar icon={null}>OP</Avatar>
      </Root>
    </div>
  );
};

export default Home;
