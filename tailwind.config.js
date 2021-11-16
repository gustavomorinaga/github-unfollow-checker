module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'media',
	important: true,
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
	variants: {
		extend: {},
		scrollbar: ['dark', 'rounded'],
	},
	plugins: [require('tailwind-scrollbar')],
};
