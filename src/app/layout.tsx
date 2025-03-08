import type { Metadata } from 'next';
import '$lib/styles/global.scss';

export const metadata: Metadata = {
	applicationName: 'GitHub Unfollow Checker',
	title: 'GitHub Unfollow Checker',
	description: 'A simple tool to check the users that does not follow you back 🧐',
	assets: '/assets',
	manifest: '/site.webmanifest',
	robots: { index: true, follow: true },
	icons: [
		{
			rel: 'favicon',
			sizes: '16x16',
			url: '/favicon.ico'
		},
		{
			rel: 'icon',
			sizes: 'any',
			type: 'image/svg+xml',
			url: '/assets/icons/icon.svg'
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: '/assets/icons/apple-touch-icon.png'
		}
	],
	openGraph: {
		siteName: 'GitHub Unfollow Checker',
		title: 'GitHub Unfollow Checker',
		description: 'A simple tool to check the users that does not follow you back 🧐',
		url: 'https://github-unfollow-checker.vercel.app',
		images: [
			{
				url: 'https://github-unfollow-checker.vercel.app/assets/logo.png',
				width: 283,
				height: 283,
				alt: 'GitHub Unfollow Checker Banner Image'
			}
		]
	},
	other: {
		'theme-color': '#3730A3'
	}
};

type TRootLayoutProps = Readonly<{
	children: React.ReactNode;
}>;

export default function RootLayout({ children }: TRootLayoutProps) {
	return (
		<html lang='en'>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700;800&display=swap'
					rel='stylesheet'
				/>
			</head>

			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
