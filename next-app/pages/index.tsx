import type { NextPage } from 'next';
import { Accordion, AccordionItemContext } from '@jengaui/accordion';
import {
  Avatar,
  Block,
  BreadcrumbItem,
  Breadcrumbs,
  Banner,
  Button,
  Cell,
  Column,
  Paragraph,
  Root,
  Row,
  Slider,
  SSRProvider,
  Table,
  TableBody,
  TableHeader,
  TOKENS,
} from '@jengaui/react';
import styles from '../styles/Home.module.css';
import { useContext } from 'react';

const Extra = () => {
  const ctx = useContext(AccordionItemContext);
  console.log(ctx);
  return (
    <Button onPress={ctx.setExpand}>{ctx.isExpanded ? 'Hide' : 'Show'}</Button>
  );
};

const Home: NextPage = () => {
  return (
    <SSRProvider>
      <Root fonts={false} tokens={TOKENS}>
        {/* <h1> Hello! </h1>
        <Block> This is Jenga-UI </Block>
        <Avatar icon={null}> OP </Avatar>
        <Button> I'm Button </Button>
        <Banner type="note"> Banner text </Banner>
        <Table
          aria-label="Example static collection table"
          styles={{ width: '600px', height: '600px' }}
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
        <Slider
          sliderLength={'100px'}
          labelPosition={'bottom'}
          styles={{ width: '200px' }}
        />
        <Breadcrumbs>
          <BreadcrumbItem>A</BreadcrumbItem>
          <BreadcrumbItem>B</BreadcrumbItem>
        </Breadcrumbs> */}
        <Block padding={'10px'}>
          <Accordion styles={{ padding: 0 }}>
            <Accordion.Item
              styles={{
                fill: '#black',
                paddingTop: '0',
                paddingBottom: '0',
                paddingLeft: '0',
                paddingRight: '0',
              }}
              key="1"
              title="Create Jenga"
              extra={<Extra />}
              isIconVisible={false}
            >
              <Paragraph fill="#purple_03" height={150}></Paragraph>
            </Accordion.Item>
            <Accordion.Item key="2" title="Create 2 Jenga" extra={<Extra />}>
              <Paragraph fill="#purple_03" height={150}></Paragraph>
            </Accordion.Item>
          </Accordion>
        </Block>
      </Root>
    </SSRProvider>
  );
};

export default Home;
