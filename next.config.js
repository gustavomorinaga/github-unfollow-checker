const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextConfig = {
	esModule: true,
	future: {
		strictPostcssConfiguration: true,
	},
	extends: [],
	images: {
		formats: ['image/avif', 'image/webp'],
		domains: ['avatars.githubusercontent.com'],
	},
	// swcMinify: true,
};

module.exports = withPlugins(
	[
		[
			withImages,
			{
				inlineImageLimit: false,
			},
		],
		[
			withPWA,
			{
				pwa: {
					disable: process.env.NODE_ENV !== 'production',
					dest: 'public',
					register: true,
					skipWaiting: true,
					runtimeCaching,
				},
			},
		],
	],
	nextConfig
);
