import NextDocument, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document';

// --- Partytown ---
import { Partytown } from '@builder.io/partytown/react';

const isProduction = process.env.NODE_ENV === 'production';

export default class Document extends NextDocument {
	static async getInitialProps(ctx: DocumentContext) {
		return NextDocument.getInitialProps(ctx);
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="icon" href="/assets/icons/icon.svg" type="image/svg+xml" />
					<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
					<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
					<link rel="manifest" href="/site.webmanifest" />

					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700;800&display=swap"
						rel="stylesheet"
					/>

					<meta name="theme-color" content="#3730A3" />

					<Partytown debug={!isProduction} forward={['dataLayer.push']} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
