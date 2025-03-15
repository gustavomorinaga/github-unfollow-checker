'use client';

import React from 'react';

import { useSession } from 'next-auth/react';

import type { TDataResponse } from '$lib/server/repositories/data';
import type { TUser } from '$lib/types';
import { catchError } from '$lib/utils/errors';
import { sleep } from '$lib/utils/sleep';

type TData = TDataResponse & { whitelist: Array<TUser> };

const INITIAL_DATA: TData = {
	followers: [],
	following: [],
	notMutuals: [],
	unfollowers: [],
	whitelist: []
};
const INITIAL_WHITELIST: Array<TUser['id']> = [];
const FOLLOWERS_KEY = 'followers';
const FOLLOWING_KEY = 'following';
const NOT_MUTUALS_KEY = 'notMutuals';
const UNFOLLOWERS_KEY = 'unfollowers';
const WHITELIST_KEY = 'whitelist';
const SLEEP_DURATION = 700;

type TDataContext = {
	/**
	 * The data response from the server.
	 */
	data: TData;
	/**
	 * An error message if the fetch operation failed, or null if no error.
	 */
	error: Error | null;
	/**
	 * A boolean indicating whether the fetch operation is in progress.
	 */
	pending: boolean;
	/**
	 * An array of user IDs that are whitelisted.
	 */
	whitelistIDs: Array<TUser['id']>;
	/**
	 * A function to manually trigger a refresh of the data response.
	 */
	refresh: () => void;
	/**
	 * Function to follow a user by username.
	 */
	follow: (usernameOrUsernames: TUser['login'] | Array<TUser['login']>) => void;
	/**
	 * Function to unfollow a user by username.
	 */
	unfollow: (usernameOrUsernames: TUser['login'] | Array<TUser['login']>) => void;
	/**
	 * Function to add a user to the whitelist.
	 */
	addToWhitelist: (idOrIDs: TUser['id'] | Array<TUser['id']>) => void;
	/**
	 * Function to remove a user from the whitelist by ID.
	 */
	removeFromWhitelist: (idOrIDs: TUser['id'] | Array<TUser['id']>) => void;
	/**
	 * Function to clear the entire whitelist.
	 */
	clearWhitelist: () => void;
};

const DataContext = React.createContext<TDataContext | undefined>(undefined);

/**
 * Provides data context to its children components.
 *
 * @returns The provider component wrapping its children with data context.
 *
 * @remarks
 * - This component uses the `useSession` hook to get the current session data and manages the state
 * - for data, error, and pending status. It fetches data from an API and caches it in local storage.
 * - If the user is not authenticated, it sets an error state.
 */
export function DataProvider({ children }: React.PropsWithChildren) {
	const isLocalStorageAvailable = typeof localStorage !== 'undefined';

	const { data: session } = useSession({ required: true });

	const alreadyRequested = React.useRef(false);

	const [data, setData] = React.useState<TDataResponse>(() => {
		const followers = isLocalStorageAvailable ? localStorage.getItem(FOLLOWERS_KEY) : null;
		const following = isLocalStorageAvailable ? localStorage.getItem(FOLLOWING_KEY) : null;
		const notMutuals = isLocalStorageAvailable ? localStorage.getItem(NOT_MUTUALS_KEY) : null;
		const unfollowers = isLocalStorageAvailable ? localStorage.getItem(UNFOLLOWERS_KEY) : null;

		if (isLocalStorageAvailable) {
			if (!followers) localStorage.setItem(FOLLOWERS_KEY, JSON.stringify(INITIAL_DATA.followers));
			if (!following) localStorage.setItem(FOLLOWING_KEY, JSON.stringify(INITIAL_DATA.following));
			if (!notMutuals)
				localStorage.setItem(NOT_MUTUALS_KEY, JSON.stringify(INITIAL_DATA.notMutuals));
			if (!unfollowers)
				localStorage.setItem(UNFOLLOWERS_KEY, JSON.stringify(INITIAL_DATA.unfollowers));
		}

		return {
			followers: followers ? JSON.parse(followers) : INITIAL_DATA.followers,
			following: following ? JSON.parse(following) : INITIAL_DATA.following,
			notMutuals: notMutuals ? JSON.parse(notMutuals) : INITIAL_DATA.notMutuals,
			unfollowers: unfollowers ? JSON.parse(unfollowers) : INITIAL_DATA.unfollowers
		};
	});
	const [error, setError] = React.useState<Error | null>(null);
	const [pending, setPending] = React.useState<boolean>(true);
	const [whitelistIDs, setWhitelistIDs] = React.useState<Array<TUser['id']>>(() => {
		const whitelist = isLocalStorageAvailable ? localStorage.getItem(WHITELIST_KEY) : null;
		if (whitelist) return JSON.parse(whitelist);
		if (isLocalStorageAvailable)
			localStorage.setItem(WHITELIST_KEY, JSON.stringify(INITIAL_WHITELIST));
		return INITIAL_WHITELIST;
	});

	const fetchData = React.useCallback(async () => {
		if (alreadyRequested.current) return;

		setPending(true);

		const isAccessTokenMissing = !session?.accessToken;
		const isUserNotAuthenticated = !session?.user;
		if (isAccessTokenMissing && isUserNotAuthenticated) {
			setError(new Error('User not authenticated'));
			sleep(SLEEP_DURATION).then(() => setPending(false));
			return;
		}

		// * Prevent multiple requests
		alreadyRequested.current = true;

		const apiURL = new URL(`/api/${session.user.login}`, location.origin);

		const fetcher = fetch(apiURL, {
			headers: { Authorization: `Bearer ${session.accessToken}` }
		}).then<TDataResponse>((res) => res.json());

		const [fetchError, data] = await catchError(fetcher);

		if (fetchError) setError(fetchError);
		else {
			setData(data);
			setError(null);

			localStorage.setItem(FOLLOWERS_KEY, JSON.stringify(data.followers));
			localStorage.setItem(FOLLOWING_KEY, JSON.stringify(data.following));
			localStorage.setItem(NOT_MUTUALS_KEY, JSON.stringify(data.notMutuals));
			localStorage.setItem(UNFOLLOWERS_KEY, JSON.stringify(data.unfollowers));
		}

		sleep(SLEEP_DURATION).then(() => setPending(false));
	}, [session?.accessToken, session?.user]);

	const follow = React.useCallback(
		async (usernameOrUsernames: TUser['login'] | Array<TUser['login']>) => {
			const isAccessTokenMissing = !session?.accessToken;
			const isUserNotAuthenticated = !session?.user;
			if (isAccessTokenMissing && isUserNotAuthenticated) {
				setError(new Error('User not authenticated'));
				return;
			}

			const usernames = Array.isArray(usernameOrUsernames)
				? usernameOrUsernames
				: [usernameOrUsernames];

			const apiURL = new URL(`/api/${session.user.login}`, location.origin);
			const fetcher = fetch(apiURL, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session.accessToken}`
				},
				body: JSON.stringify({ usernames })
			}).then<TDataResponse>((res) => res.json());

			const [fetchError] = await catchError(fetcher);
			if (!fetchError) {
				for (const username of usernames) {
					setData(({ followers, following, notMutuals, unfollowers }) => {
						return {
							followers: followers.filter((user) => user.login !== username),
							following: following.filter((user) => user.login !== username),
							notMutuals: notMutuals.filter((user) => user.login !== username),
							unfollowers: unfollowers.filter((user) => user.login !== username)
						};
					});
				}
			}
		},
		[session?.accessToken, session?.user]
	);

	const unfollow = React.useCallback(
		async (usernameOrUsernames: TUser['login'] | Array<TUser['login']>) => {
			const isAccessTokenMissing = !session?.accessToken;
			const isUserNotAuthenticated = !session?.user;
			if (isAccessTokenMissing && isUserNotAuthenticated) {
				setError(new Error('User not authenticated'));
				return;
			}

			const usernames = Array.isArray(usernameOrUsernames)
				? usernameOrUsernames
				: [usernameOrUsernames];

			const apiURL = new URL(`/api/${session.user.login}`, location.origin);
			const fetcher = fetch(apiURL, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session.accessToken}`
				},
				body: JSON.stringify({ usernames })
			}).then<TDataResponse>((res) => res.json());

			const [fetchError] = await catchError(fetcher);
			if (!fetchError) {
				for (const username of usernames) {
					setData(({ followers, following, notMutuals, unfollowers }) => {
						return {
							followers: followers.filter((user) => user.login !== username),
							following: following.filter((user) => user.login !== username),
							notMutuals: notMutuals.filter((user) => user.login !== username),
							unfollowers: unfollowers.filter((user) => user.login !== username)
						};
					});
				}
			}
		},
		[session?.accessToken, session?.user]
	);

	const addToWhitelist = React.useCallback((idOrIDs: TUser['id'] | Array<TUser['id']>) => {
		setWhitelistIDs((prevWhitelist) => {
			const usersToAdd = Array.isArray(idOrIDs) ? idOrIDs : [idOrIDs];
			const newWhitelist = [...new Set([...prevWhitelist, ...usersToAdd])];
			localStorage.setItem(WHITELIST_KEY, JSON.stringify(newWhitelist));
			return newWhitelist;
		});
	}, []);

	const removeFromWhitelist = React.useCallback((idOrIDs: TUser['id'] | Array<TUser['id']>) => {
		setWhitelistIDs((prevWhitelist) => {
			const idsToRemove = Array.isArray(idOrIDs) ? idOrIDs : [idOrIDs];
			const newWhitelist = prevWhitelist.filter((item) => !idsToRemove.includes(item));
			localStorage.setItem(WHITELIST_KEY, JSON.stringify(newWhitelist));
			return newWhitelist;
		});
	}, []);

	const clearWhitelist = React.useCallback(() => {
		setWhitelistIDs([]);
		localStorage.removeItem(WHITELIST_KEY);
	}, []);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	React.useEffect(() => {
		function handleStorageEvent(event: StorageEvent) {
			const isWhitelistKey = event.key === WHITELIST_KEY;
			if (isWhitelistKey) setWhitelistIDs(JSON.parse(event.newValue || '[]'));
		}

		window.addEventListener('storage', handleStorageEvent);

		return () => {
			window.removeEventListener('storage', handleStorageEvent);
		};
	}, []);

	const whitelist = React.useMemo(() => {
		if (!data.following.length) return [];
		return data.following.filter((user) => whitelistIDs.includes(user.id));
	}, [data.following, whitelistIDs]);

	const value: TDataContext = {
		data: { ...data, whitelist },
		error,
		pending,
		whitelistIDs,
		refresh: () => {
			alreadyRequested.current = false;
			fetchData();
		},
		follow,
		unfollow,
		addToWhitelist,
		removeFromWhitelist,
		clearWhitelist
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

/**
 * Custom hook to access the DataContext.
 *
 * This hook provides access to the data stored in the DataContext. It must be used within a DataProvider,
 * otherwise it will throw an error.
 *
 * @returns The current context value for DataContext.
 * @throws If the hook is used outside of a DataProvider.
 */
export function useData() {
	const context = React.useContext(DataContext);
	if (!context) throw new Error('useData must be used within a DataProvider');

	return context;
}
