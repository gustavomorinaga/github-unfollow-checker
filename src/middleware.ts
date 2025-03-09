import { auth } from '$lib/auth';

export default auth((req) => {
	const isAuthenticatedUser = Boolean(req.auth);
	const isLoginPath = req.nextUrl.pathname.startsWith('/login');

	if (!isAuthenticatedUser && !isLoginPath) {
		const newURL = new URL('/login', req.nextUrl.origin);
		return Response.redirect(newURL);
	}
});

export const config = {
	matcher: ['/((?!api|_next|assets|favicon.ico|site.webmanifest).*)']
};
