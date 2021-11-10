import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

// --- Configs ---
import SEO from '../../next-seo.config';

// --- Styles ---
import '@styles/global.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router: { route } }) => {
	return (
		<>
			<DefaultSeo {...SEO} />
			<main>
				<Component {...pageProps} key={route} />
			</main>
		</>
	);
};

export default MyApp;
