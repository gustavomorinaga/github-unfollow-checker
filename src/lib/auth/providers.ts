import GitHubProvider from 'next-auth/providers/github';

export const GitHub = GitHubProvider({
	clientId: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	authorization: {
		params: {
			scope: 'user:follow'
		}
	}
});
