import { auth } from '$lib/auth';

const WHITELISTED_PATHS = ['/home', '/legal', '/login'];

export default auth((req) => {
	const isAuthenticatedUser = Boolean(req.auth);
	const isWhitelistedPath = WHITELISTED_PATHS.some((path) => req.nextUrl.pathname.startsWith(path));

	if (!isAuthenticatedUser && !isWhitelistedPath) {
		const isRootPath = req.nextUrl.pathname === '/';
		const redirectPath = isRootPath ? '/home' : `/login?next=${req.nextUrl.pathname}`;
		const newURL = new URL(redirectPath, req.nextUrl.origin);
		return Response.redirect(newURL);
	}
});

export const config = {
	matcher: ['/((?!api|_next|assets|favicon.ico|site.webmanifest).*)']
};
