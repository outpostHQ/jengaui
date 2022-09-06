import '../styles/globals.css';
import { Block, BreakpointsProvider, Root, SSRProvider } from '@cube-dev/ui-kit';
import { useRouter } from 'next/router';
// import { Layout } from '../components/shared';
import { AppPropsWithLayout } from '../utils/types';
import { TOKENS } from '../utils/tokens';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	//if .getLayout exits use that else use the normal layout
	const getLayout = Component.getLayout ?? ((page) => <Block>{page}</Block>);
	let router = useRouter();
	return (
		<SSRProvider>
			<Root fonts={false} router={router} tokens={TOKENS}>
				<BreakpointsProvider value={[1200, 768]}>
					<Block color="rgba(43, 41, 98, 1)">
						{/* color is rgba(20,20,70,0.75) without it, 
                        this is a temp fix till found a solution for it */}
						{getLayout(<Component {...pageProps} />)}
					</Block>
				</BreakpointsProvider>
			</Root>
		</SSRProvider>
	);
}

export default MyApp;
