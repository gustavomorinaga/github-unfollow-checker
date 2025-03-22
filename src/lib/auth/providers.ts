import GitHubProvider from 'next-auth/providers/github';

/**
 * GitHub authentication provider configuration.
 *
 * This configuration sets up the GitHub OAuth provider with specific authorization parameters.
 */
export const GitHub = GitHubProvider({
	authorization: {
		params: {
			scope: 'user:follow'
		}
	}
});
