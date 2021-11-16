import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { DefaultSeo } from 'next-seo';

// --- Configs ---
import SEO from '../../next-seo.config';

// --- Styles ---
import '@styles/global.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router: { route } }) => {
	return (
		<Provider session={pageProps.session}>
			<DefaultSeo {...SEO} />
			<Component {...pageProps} key={route} />
		</Provider>
	);
};

export default MyApp;
