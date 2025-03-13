import { signIn, signOut } from './auth';

/**
 * Handles the sign-in process for the application.
 *
 * This function uses the 'signIn' method to authenticate the user with GitHub.
 * It specifies the redirect URL to be the root of the application after a successful sign-in.
 *
 * @returns A promise that resolves when the sign-in process is complete.
 */
export async function handleSignIn() {
	'use server';
	await signIn('github', { redirectTo: '/dashboard' });
}

/**
 * Handles the sign-out process for the application.
 *
 * This function uses the 'signOut' method to log the user out and redirects them to the login page.
 *
 * @returns A promise that resolves when the sign-out process is complete.
 */
export async function handleSignOut() {
	'use server';
	await signOut({ redirectTo: '/login' });
}
