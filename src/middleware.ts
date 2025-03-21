import { auth } from '$lib/auth';

const WHITELISTED_PATHS = ['/', '/login', '/legal'];

export default auth((req) => {
	const isAuthenticatedUser = Boolean(req.auth);
	const isWhitelistedPath = WHITELISTED_PATHS.some((path) => req.nextUrl.pathname.startsWith(path));

	if (!isAuthenticatedUser && !isWhitelistedPath) {
		const newURL = new URL('/login', req.nextUrl.origin);
		return Response.redirect(newURL);
	}
});

export const config = {
	matcher: ['/((?!api|_next|assets|favicon.ico|site.webmanifest).*)']
};
