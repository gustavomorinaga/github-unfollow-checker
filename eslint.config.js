import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname
});

/** @type {import('eslint').Linter.Config} */
const config = [
	...compat.config({
		extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
		plugins: ['prettier']
	}),
	{
		ignores: [
			'**/.DS_Store',
			'**/.env.development.local',
			'**/.env.local',
			'**/.env.production.local',
			'**/.env.test.local',
			'**/.github',
			'**/.husky',
			'**/.next',
			'**/.pnp.js',
			'**/.vercel',
			'**/.vscode',
			'**/*.pem',
			'**/npm-debug.log*',
			'**/yarn-debug.log*',
			'**/yarn-error.log*',
			'build',
			'coverage',
			'node_modules',
			'out/',
			'public/*.js',
			'public/*.map'
		],
		rules: {
			'@typescript-eslint/no-empty-function': 'off'
		}
	}
];

export default config;
