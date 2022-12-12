import NextAuth, { AuthOptions, Profile } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

// --- Interfaces ---
import { ISession } from '@interfaces/ISession';

interface IProfile extends Profile {
	login: string;
	html_url: string;
}

export const authOptions: AuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			httpOptions: {
				timeout: 30000, // 30 seconds
			},
			authorization: {
				params: {
					scope: 'user:follow', // to allow unfollow option
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account) {
				const accessToken = account.access_token;
				const { login, html_url } = <IProfile>profile;

				token = { ...token, accessToken, login, html_url };
			}

			return token;
		},
		async session({ session, token }) {
			const user = {
				...session.user,
				login: token.login,
				html_url: token.html_url,
			};

			return { ...session, user, accessToken: token.accessToken } as ISession;
		},
	},
};

export default NextAuth(authOptions);
