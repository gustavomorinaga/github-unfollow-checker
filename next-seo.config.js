/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
	type: 'website',
	defaultTitle: 'GitHub Unfollow Checker',
	description: 'A simple tool to check the users that does not follow you back 🧐',
	site_name: 'GitHub Unfollow Checker',
	openGraph: {
		url: 'https://github-unfollow-checker.vercel.app',
		title: 'GitHub Unfollow Checker',
		description: 'A simple tool to check the users that does not follow you back 🧐',
		images: [
			{
				url: 'https://github-unfollow-checker.vercel.app/assets/logo.png',
				width: 283,
				height: 283,
				alt: 'GitHub Unfollow Checker Banner Image',
			},
		],
		site_name: 'GitHub Unfollow Checker',
	},
};

export default defaultSEOConfig;
