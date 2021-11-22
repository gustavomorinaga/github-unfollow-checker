import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { DefaultSeo } from 'next-seo';

// --- Configs ---
import SEO from '../../next-seo.config';

// --- Styles ---
import '@styles/global.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<Provider session={pageProps.session}>
			<DefaultSeo {...SEO} />
			<Component {...pageProps} />
		</Provider>
	);
};

export default MyApp;
