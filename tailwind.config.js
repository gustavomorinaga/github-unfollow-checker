/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
	important: true,
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
	theme: {
		minWidth: {
			0: '0',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			full: '100%',
		},
		extend: {
			fontFamily: {
				sans: ['Inter'],
			},
			backgroundImage: theme => ({
				wave: `url('/assets/svgs/wave.svg')`,
			}),
		},
	},
};

module.exports = tailwindConfig;
