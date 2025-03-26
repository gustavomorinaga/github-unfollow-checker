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
