import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			email: string;
			image: string;
			html_url: string;
			login: string;
			name: string;
		};
	}
}
