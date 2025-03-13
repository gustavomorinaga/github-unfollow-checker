import NextAuth, { type DefaultSession } from 'next-auth';
import 'next-auth/jwt';

import { GitHub } from './providers';

declare module 'next-auth' {
	interface Profile {
		login: string;
		html_url: string;
	}

	interface Session {
		accessToken?: string;
		user: DefaultSession['user'] & {
			email: string;
			html_url: string;
			image: string;
			login: string;
			name: string;
		};
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken?: string;
		login: string;
		html_url: string;
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [GitHub],
	pages: {
		signIn: '/login'
	},
	callbacks: {
		authorized: async ({ auth }) => Boolean(auth),
		jwt: async ({ account, profile, token }) => {
			if (!account?.access_token) return token;
			if (!profile) return token;

			const { login, html_url } = profile;
			const accessToken = account.access_token;

			return { ...token, accessToken, login, html_url };
		},
		session: async ({ session, token }) => {
			const { accessToken, login, html_url } = token;

			session.accessToken = accessToken;
			session.user = { ...session.user, login, html_url };

			return session;
		}
	}
});
