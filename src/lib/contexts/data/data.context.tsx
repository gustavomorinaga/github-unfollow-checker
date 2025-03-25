'use client';

import React from 'react';

import { useSession } from 'next-auth/react';

import { deflate, inflate } from '@rescale/slim';

import { useLocalStorage } from 'react-haiku';

import type { TDataResponse } from '$lib/server/repositories/data';
import type { TUser } from '$lib/types';
import { catchError } from '$lib/utils/errors';
import { sleep } from '$lib/utils/sleep';

type TData = TDataResponse & { whitelist: Array<TUser['id']> };

const INITIAL_DATA: TData = {
	followers: [],
	following: [],
	notMutuals: [],
	unfollowers: [],
	whitelist: []
};
const SLEEP_DURATION = 700;

type TDataContext = {
	/**
	 * The data available in the context.
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
	 * A function to manually trigger a refresh of the data response.
	 */
	refresh: () => Promise<void>;
	/**
	 * Function to follow a user by username.
	 */
	follow: (usernameOrUsernames: TUser['login'] | Array<TUser['login']>) => Promise<void>;
	/**
	 * Function to unfollow a user by username.
	 */
	unfollow: (usernameOrUsernames: TUser['login'] | Array<TUser['login']>) => Promise<void>;
	/**
	 * Function to add a user to the whitelist.
	 */
	addToWhitelist: (idOrIDs: TUser['id'] | Array<TUser['id']>) => Promise<void>;
	/**
	 * Function to remove a user from the whitelist by ID.
	 */
	removeFromWhitelist: (idOrIDs: TUser['id'] | Array<TUser['id']>) => Promise<void>;
	/**
	 * Function to clear the entire whitelist.
	 */
	clearWhitelist: () => Promise<void>;
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
	const { data: session } = useSession({ required: true });

	const CACHE_KEYS = {
		FOLLOWERS: `${session?.user.login}:followers`,
		FOLLOWING: `${session?.user.login}:following`,
		NOT_MUTUALS: `${session?.user.login}:not-mutuals`,
		UNFOLLOWERS: `${session?.user.login}:unfollowers`,
		WHITELIST: `${session?.user.login}:whitelist`
	} as const;

	const [deflatedFollowers, setDeflatedFollowers] = useLocalStorage(
		CACHE_KEYS.FOLLOWERS,
		deflate(INITIAL_DATA.followers)
	);
	const [deflatedFollowing, setDeflatedFollowing] = useLocalStorage(
		CACHE_KEYS.FOLLOWING,
		deflate(INITIAL_DATA.following)
	);
	const [deflatedNotMutuals, setDeflatedNotMutuals] = useLocalStorage(
		CACHE_KEYS.NOT_MUTUALS,
		deflate(INITIAL_DATA.notMutuals)
	);
	const [deflatedUnfollowers, setDeflatedUnfollowers] = useLocalStorage(
		CACHE_KEYS.UNFOLLOWERS,
		deflate(INITIAL_DATA.unfollowers)
	);
	const [deflatedWhitelist, setDeflatedWhitelist] = useLocalStorage(
		CACHE_KEYS.WHITELIST,
		deflate(INITIAL_DATA.whitelist)
	);

	const alreadyRequested = React.useRef(false);
	const [error, setError] = React.useState<Error | null>(null);
	const [pending, setPending] = React.useState<boolean>(true);

	const data = React.useMemo<TData>(
		() => ({
			followers: inflate(deflatedFollowers) as TData['followers'],
			following: inflate(deflatedFollowing) as TData['following'],
			notMutuals: inflate(deflatedNotMutuals) as TData['notMutuals'],
			unfollowers: inflate(deflatedUnfollowers) as TData['unfollowers'],
			whitelist: inflate(deflatedWhitelist) as TData['whitelist']
		}),
		[
			deflatedFollowers,
			deflatedFollowing,
			deflatedNotMutuals,
			deflatedUnfollowers,
			deflatedWhitelist
		]
	);

	const fetchData = React.useCallback(
		async ({ shouldUpdatePending = true } = {}) => {
			if (alreadyRequested.current) return;
			if (!session) return;

			if (shouldUpdatePending) setPending(true);

			const isAccessTokenMissing = !session.accessToken;
			const isUserNotAuthenticated = !session.user;
			if (isAccessTokenMissing && isUserNotAuthenticated) {
				setError(new Error('User not authenticated'));
				if (shouldUpdatePending) sleep(SLEEP_DURATION).then(() => setPending(false));
				return;
			}

			// * Prevent multiple requests
			alreadyRequested.current = true;

			const apiURL = new URL(`/api/${session.user.login}`, location.origin);

			const fetcher = fetch(apiURL, {
				headers: { Authorization: `Bearer ${session.accessToken}` }
			}).then<string>((res) => res.json());

			const [fetchError, fetchedData] = await catchError(fetcher);

			if (fetchError) setError(fetchError);
			else {
				const inflatedData = inflate(fetchedData) as TDataResponse;

				setDeflatedFollowers(deflate(inflatedData.followers));
				setDeflatedFollowing(deflate(inflatedData.following));
				setDeflatedNotMutuals(deflate(inflatedData.notMutuals));
				setDeflatedUnfollowers(deflate(inflatedData.unfollowers));
				setError(null);
			}

			if (shouldUpdatePending) sleep(SLEEP_DURATION).then(() => setPending(false));
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[session]
	);

	const refresh = React.useCallback(
		async (options?: Partial<{ shouldUpdatePending: boolean }>) => {
			alreadyRequested.current = false;
			return fetchData(options);
		},
		[fetchData]
	);

	const handleFollowAction = React.useCallback(
		async (
			usernameOrUsernames: TUser['login'] | Array<TUser['login']>,
			action: 'follow' | 'unfollow'
		) => {
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
				method: action === 'follow' ? 'PUT' : 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session.accessToken}`
				},
				body: JSON.stringify({ usernames })
			}).then<TDataResponse>((res) => res.json());

			const [fetchError] = await catchError(fetcher);
			if (!fetchError) refresh({ shouldUpdatePending: false });
		},
		[session, refresh]
	);

	const follow = React.useCallback(
		(usernameOrUsernames: TUser['login'] | Array<TUser['login']>) =>
			handleFollowAction(usernameOrUsernames, 'follow'),
		[handleFollowAction]
	);

	const unfollow = React.useCallback(
		(usernameOrUsernames: TUser['login'] | Array<TUser['login']>) =>
			handleFollowAction(usernameOrUsernames, 'unfollow'),
		[handleFollowAction]
	);

	const handleWhitelistAction = React.useCallback(
		async (idOrIDs: TUser['id'] | Array<TUser['id']>, action: 'add' | 'remove' | 'clear') =>
			setDeflatedWhitelist((prev) => {
				const prevWhitelist = inflate(prev) as Array<TUser['id']>;
				const ids = Array.isArray(idOrIDs) ? idOrIDs : [idOrIDs];

				const actionMap: Record<typeof action, () => Array<TUser['id']>> = {
					add: () => [...new Set([...prevWhitelist, ...ids])],
					remove: () => prevWhitelist.filter((item) => !ids.includes(item)),
					clear: () => INITIAL_DATA.whitelist
				};

				const updatedWhitelist = actionMap[action]();
				return deflate(updatedWhitelist);
			}),
		[setDeflatedWhitelist]
	);

	const addToWhitelist = React.useCallback(
		(idOrIDs: TUser['id'] | Array<TUser['id']>) => handleWhitelistAction(idOrIDs, 'add'),
		[handleWhitelistAction]
	);

	const removeFromWhitelist = React.useCallback(
		(idOrIDs: TUser['id'] | Array<TUser['id']>) => handleWhitelistAction(idOrIDs, 'remove'),
		[handleWhitelistAction]
	);

	const clearWhitelist = React.useCallback(
		() => handleWhitelistAction([], 'clear'),
		[handleWhitelistAction]
	);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	const value: TDataContext = {
		data,
		error,
		pending,
		follow,
		unfollow,
		addToWhitelist,
		removeFromWhitelist,
		clearWhitelist,
		refresh
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
