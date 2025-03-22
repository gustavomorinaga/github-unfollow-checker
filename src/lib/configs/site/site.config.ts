import type { Metadata } from 'next';

export type TRepoMetadata = {
	owner: {
		email: string;
		name: string;
		username: string;
	};
	repo: string;
};

/**
 * Metadata information about the repository owner and the repository itself.
 */
export const repoMetadata: TRepoMetadata = {
	owner: {
		email: 'me@gustavomorinaga.dev',
		name: 'Gustavo Morinaga',
		username: 'gustavomorinaga'
	},
	repo: 'github-unfollow-checker'
};

export type TSiteMetadata = Metadata & { other: Metadata['other'] & { 'theme-color': string } };

/**
 * Metadata information about the site.
 */
export const siteMetadata: TSiteMetadata = {
	applicationName: 'GitHub Unfollow Checker',
	title: 'GitHub Unfollow Checker',
	description: "A simple tool to check the users that doesn't follow you back 🧐",
	keywords: ['GitHub', 'Unfollow', 'Checker', 'Followers', 'Following', 'Users'],
	authors: [{ name: 'Gustavo Morinaga', url: 'https://gustavomorinaga.dev' }],
	assets: '/assets',
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
			url: '/assets/images/logo.svg'
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: '/assets/icons/apple-touch-icon.png'
		}
	],
	openGraph: {
		type: 'website',
		siteName: 'GitHub Unfollow Checker',
		title: 'GitHub Unfollow Checker',
		description: "A simple tool to check the users that doesn't follow you back 🧐",
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
