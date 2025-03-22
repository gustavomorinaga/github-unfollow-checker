import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'GitHub Unfollow Checker',
		short_name: 'GHUC',
		description: "A simple tool to check the users that doesn't follow you back 🧐",
		start_url: '/',
		display: 'standalone',
		background_color: '#3730A3',
		theme_color: '#3730A3',
		icons: [
			{
				src: '/assets/icons/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png'
			},
			{
				src: '/assets/icons/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png'
			},
			{
				src: '/assets/icons/android-chrome-maskable-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable'
			},
			{
				src: '/assets/icons/android-chrome-maskable-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable'
			}
		]
	};
}
