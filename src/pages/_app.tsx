import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';

// --- Configs ---
import SEO from '../../next-seo.config';

// --- Styles ---
import '@styles/global.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<SessionProvider session={pageProps.session}>
			<DefaultSeo {...SEO} />
			<Component {...pageProps} />
		</SessionProvider>
	);
};

export default MyApp;
