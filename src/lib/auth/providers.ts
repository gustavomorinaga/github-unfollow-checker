import GitHubProvider from 'next-auth/providers/github';

export const GitHub = GitHubProvider({
	authorization: {
		params: {
			scope: 'user:follow'
		}
	}
});
