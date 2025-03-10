import '$lib/styles/global.css';
import type { Metadata } from 'next';

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

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang='en'>
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
