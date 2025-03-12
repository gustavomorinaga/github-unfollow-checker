'use server';

import { auth } from '$lib/auth';
import type { TUser } from '$lib/types';
import { catchError } from '$lib/utils/errors';
import { headers } from 'next/headers';

/**
 * Fetches the list of unfollowers for the authenticated user.
 *
 * This function retrieves the current session using the `auth` function and constructs
 * the API URL for fetching the unfollowers based on the user's login. It then performs
 * a fetch request to the constructed API URL with the appropriate authorization header.
 *
 * @returns A promise that resolves to an array of unfollower users.
 */
export async function getUnfollowers() {
	const session = await auth();

	const isAccessTokenMissing = !session?.accessToken;
	const isUserNotAuthenticated = !session?.user;
	if (isAccessTokenMissing && isUserNotAuthenticated) return { message: 'User not authenticated' };

	const baseURL = (await headers()).get('referer')!;
	const apiURL = new URL(`/api/${session.user.login}/unfollowers`, baseURL);

	const fetcher = fetch(apiURL, {
		headers: { Authorization: `Bearer ${session.accessToken}` },
		cache: 'force-cache'
	}).then<Array<TUser>>((res) => res.json());

	const [error, data] = await catchError(fetcher);

	if (error) return { message: error.message };

	return { data };
}
