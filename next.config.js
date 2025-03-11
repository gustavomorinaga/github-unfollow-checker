import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	images: { domains: ['avatars.githubusercontent.com'] },
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
};

const withMDX = createMDX();

export default withMDX(config);
