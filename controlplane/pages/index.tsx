import { Block, Flex, Link, Text } from '@cube-dev/ui-kit';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../utils/types';

const Home: NextPageWithLayout = () => {
	return (
		<Flex flow="column" padding="100px">
			<Text>
				test user Profile
				<Link flex="1" outline="none" to="/shalinikaushal">
					/shalinikaushal
				</Link>
			</Text>
			<Text>
				test team profile
				<Link flex="1" outline="none" to="/numldesign">
					/numldesign
				</Link>
			</Text>
		</Flex>
	);
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
	return <Block>{page}</Block>;
};

// export function getServerSideProps() {
// 	return {
// 		redirect: {
// 			destination: '/shalinikaushal',
// 			permanent: false
// 		}
// 	};
// }
