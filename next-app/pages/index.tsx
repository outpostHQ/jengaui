import type { NextPage } from 'next';
import { Accordion } from '@jenga-ui/accordion';
import {
  Avatar,
  Block,
  BreadcrumbItem,
  Breadcrumbs,
  Banner,
  Notification,
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
} from '@jenga-ui/react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <SSRProvider>
      <Root>
        <h1> Hello! </h1>
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
        </Breadcrumbs>
        <Accordion>
          <Accordion.Item key="1" isDefaultExpanded title="Create Jenga">
            <Paragraph fill="#purple_03" height={150}></Paragraph>
          </Accordion.Item>
        </Accordion>
      </Root>
    </SSRProvider>
  );
};

export default Home;
