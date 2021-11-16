import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
	// debug: process.env.NODE_ENV === 'development',
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			scope: 'user:follow',
		}),
	],
	callbacks: {
		async jwt(token, user, account, profile, isNewUser) {
			if (account?.accessToken) {
				token.accessToken = account.accessToken;
				token.login = profile.login;
				token.html_url = profile.html_url;
			}
			return token;
		},
		async session(session, token) {
			session.accessToken = token.accessToken;
			session.user.login = token.login;
			session.user.html_url = token.html_url;
			return session;
		},
	},
});
