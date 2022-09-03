import React from 'react';
import { Block } from '@jenga-ui/react';

export function Section(props) {
  return (
    <Block role="region" width="100%" {...props}/>
  );
}
