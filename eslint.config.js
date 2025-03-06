import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname
});

/** @type {import('eslint').Linter.Config} */
export default [
	...compat.config({
		extends: ['next', 'next/typescript', 'plugin:prettier/recommended'],
		plugins: ['prettier']
	}),
	{
		ignores: [
			'.next/',
			'.pnp',
			'**/.DS_Store',
			'**/.env.development.local',
			'**/.env.local',
			'**/.env.production.local',
			'**/.env.test.local',
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
