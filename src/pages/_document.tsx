import Document, { DocumentProps, Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document<DocumentProps> {
	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head>
					<link rel="icon" href="./assets/icons/icon.svg" type="image/svg+xml" />
					<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
					<link rel="apple-touch-icon" href="./assets/icons/apple-touch-icon.png" />
					<link rel="manifest" href="./site.webmanifest" />

					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700;800&display=swap"
						rel="stylesheet"
					/>

					<meta name="theme-color" content="#3730A3" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
