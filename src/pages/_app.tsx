import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';

// --- Configs ---
import SEO from '../../next-seo.config';

// --- Styles ---
import '@styles/global.scss';

export default function _app({ Component, pageProps, router: { route } }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<DefaultSeo {...SEO} />
			<Component {...pageProps} key={route} />
		</SessionProvider>
	);
}
