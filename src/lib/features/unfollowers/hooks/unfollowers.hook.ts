'use client';

import React from 'react';

import { useSession } from 'next-auth/react';

import type { TUser } from '$lib/types';
import { catchError } from '$lib/utils/errors';
import { sleep } from '$lib/utils/sleep';

const SLEEP_DURATION = 1_000;
const CACHE_KEY = 'unfollowers';

type TUseUnfollowersHook = () => {
	/**
	 * The list of unfollowers, or null if not yet fetched.
	 */
	data: Array<TUser> | null;
	/**
	 * An error message if the fetch operation failed, or null if no error.
	 */
	error: Error | null;
	/**
	 * A boolean indicating whether the fetch operation is in progress.
	 */
	pending: boolean;
	/**
	 * A function to manually trigger a refresh of the unfollowers list.
	 */
	refresh: () => void;
};

/**
 * Custom hook to fetch and manage the list of unfollowers for the authenticated user.
 */
export const useUnfollowers: TUseUnfollowersHook = () => {
	const { data: session } = useSession({ required: true });

	const [unfollowers, setUnfollowers] = React.useState<TUser[] | null>(null);
	const [error, setError] = React.useState<Error | null>(null);
	const [pending, setPending] = React.useState<boolean>(true);

	const fetchUnfollowers = React.useCallback(
		async ({ refresh = false } = {}) => {
			const isAccessTokenMissing = !session?.accessToken;
			const isUserNotAuthenticated = !session?.user;
			if (isAccessTokenMissing && isUserNotAuthenticated) {
				setError(new Error('User not authenticated'));
				sleep(SLEEP_DURATION).then(() => setPending(false));
				return;
			}

			if (!refresh) {
				const cachedData = localStorage.getItem(CACHE_KEY);
				if (cachedData) {
					setUnfollowers(JSON.parse(cachedData));
					sleep(SLEEP_DURATION).then(() => setPending(false));
					return;
				}
			}

			setPending(true);

			const apiURL = new URL(`/api/${session.user.login}/unfollowers`, location.origin);

			const fetcher = fetch(apiURL, {
				headers: { Authorization: `Bearer ${session.accessToken}` },
				cache: 'force-cache'
			}).then<Array<TUser>>((res) => res.json());

			const [fetchError, data] = await catchError(fetcher);

			if (fetchError) setError(fetchError);
			else {
				setUnfollowers(data);
				localStorage.setItem(CACHE_KEY, JSON.stringify(data));
			}

			sleep(SLEEP_DURATION).then(() => setPending(false));
		},
		[session?.accessToken, session?.user]
	);

	React.useEffect(() => {
		fetchUnfollowers();
	}, [fetchUnfollowers]);

	return {
		data: unfollowers,
		error,
		pending,
		refresh: () => fetchUnfollowers({ refresh: true })
	};
};
