import { Block, Button, Flex, Text, Link } from '@cube-dev/ui-kit';
import { useRouter } from 'next/router';
import { Cell, Column, Row, Table, TableBody, TableHeader } from '@jenga-ui/table';
import { ReactElement } from 'react';
import { MailFilled } from '@ant-design/icons';

export default function CheckEmail<NextPageWithLayout>() {
	const router = useRouter();

	const email = router.query.email as string;
	return (
		<Block fill="var(--sec-bg)" width="100vw" height="100vh">
			<Flex
				gap="40px"
				flow="column"
				alignItems="center"
				justifyContent="center"
				height="100vh"
				width={['40vw', '70vw', '90vw']}
				margin="auto"
				textAlign="center"
			>
				<Text weight="600" preset="h1" styles={{ fontSize: '42px' }}>
					Check your email
				</Text>
				<Text preset="h5s">Do not close this window until opening the email link</Text>
				<Text preset="t3m">
					We have sent an email to{' '}
					<Text color="#primary">
						{email} (<Link to={'/auth/signup' + '?email=' + email}>undo</Link>)
					</Text>{' '}
					to confirm the validation. Please verify the provided security code mathes the following
					text:
				</Text>
				<Button type="primary" width="100%" paddingBlock="12px" icon={<MailFilled />} radius="2r">
					Resend
				</Button>
			</Flex>
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
		</Block>
	);
}

CheckEmail.getLayout = function getLayout(page: ReactElement) {
	return <Block>{page}</Block>;
};
