import { auth as middleware } from './auth';

export default middleware((req) => {
	const isUserAuthenticated = !req.auth;
	const isNotLoginPath = req.nextUrl.pathname !== '/login';

	if (isUserAuthenticated && isNotLoginPath) {
		const newURL = new URL('/login', req.nextUrl.origin);
		return Response.redirect(newURL);
	}
});
