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
const CACHE_KEYS = {
	FOLLOWERS: 'followers',
	FOLLOWING: 'following',
	NOT_MUTUALS: 'notMutuals',
	UNFOLLOWERS: 'unfollowers',
	WHITELIST: 'whitelist'
} as const;
const SLEEP_DURATION = 1_000;

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
	const isLocalStorageAvailable = typeof localStorage !== 'undefined';

	const { data: session } = useSession({ required: true });

	const alreadyRequested = React.useRef(false);

	const [data, setData] = React.useState<TDataResponse>(INITIAL_DATA);
	const [error, setError] = React.useState<Error | null>(null);
	const [pending, setPending] = React.useState<boolean>(true);
	const [whitelistIDs, setWhitelistIDs] = React.useState<Array<TUser['id']>>(() => {
		if (!isLocalStorageAvailable) return INITIAL_WHITELIST;

		const whitelist = localStorage.getItem(CACHE_KEYS.WHITELIST);
		if (!whitelist) {
			localStorage.setItem(CACHE_KEYS.WHITELIST, JSON.stringify(INITIAL_WHITELIST));
			return INITIAL_WHITELIST;
		}

		return JSON.parse(whitelist);
	});

	function pruneData(usernames: Array<TUser['login']>) {
		const usernameSet = new Set(usernames);

		const pruneUsersFromList = (list: Array<TUser>) =>
			list.filter((user) => !usernameSet.has(user.login));

		setData((prevData) => {
			const updatedData = { ...prevData };
			for (const key of Object.keys(updatedData))
				updatedData[key] = pruneUsersFromList(updatedData[key]);
			return updatedData;
		});
	}

	const fetchData = React.useCallback(async () => {
		if (alreadyRequested.current) return;
		if (!session) return;

		setPending(true);

		const isAccessTokenMissing = !session.accessToken;
		const isUserNotAuthenticated = !session.user;
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

		const [fetchError, fetchedData] = await catchError(fetcher);

		if (fetchError) setError(fetchError);
		else {
			localStorage.setItem(CACHE_KEYS.FOLLOWERS, JSON.stringify(fetchedData.followers));
			localStorage.setItem(CACHE_KEYS.FOLLOWING, JSON.stringify(fetchedData.following));
			localStorage.setItem(CACHE_KEYS.NOT_MUTUALS, JSON.stringify(fetchedData.notMutuals));
			localStorage.setItem(CACHE_KEYS.UNFOLLOWERS, JSON.stringify(fetchedData.unfollowers));

			setData(fetchedData);
			setError(null);
		}

		sleep(SLEEP_DURATION).then(() => setPending(false));
	}, [session]);

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
			if (!fetchError) pruneData(usernames);
		},
		[session]
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
		async (idOrIDs: TUser['id'] | Array<TUser['id']>, action: 'add' | 'remove' | 'clear') => {
			setWhitelistIDs((prevWhitelist) => {
				const ids = Array.isArray(idOrIDs) ? idOrIDs : [idOrIDs];

				const actionMap: Record<typeof action, () => Array<TUser['id']>> = {
					add: () => [...new Set([...prevWhitelist, ...ids])],
					remove: () => prevWhitelist.filter((item) => !ids.includes(item)),
					clear: () => INITIAL_WHITELIST
				};

				if (!actionMap[action]) return prevWhitelist;

				const updatedWhitelist = actionMap[action]();

				localStorage.setItem(CACHE_KEYS.WHITELIST, JSON.stringify(updatedWhitelist));
				return updatedWhitelist;
			});
		},
		[]
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

	const refresh = React.useCallback(async () => {
		alreadyRequested.current = false;
		return fetchData();
	}, [fetchData]);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	React.useEffect(() => {
		function handleStorageEvent(event: StorageEvent) {
			if (!event.key) return;

			const parsedEventValue = JSON.parse(event.newValue || '[]');

			const eventMap: Record<(typeof CACHE_KEYS)[keyof typeof CACHE_KEYS], () => void> = {
				[CACHE_KEYS.FOLLOWERS]: () => {
					setData((prevData) => ({ ...prevData, followers: parsedEventValue }));
					localStorage.setItem(CACHE_KEYS.FOLLOWERS, JSON.stringify(parsedEventValue));
				},
				[CACHE_KEYS.FOLLOWING]: () => {
					setData((prevData) => ({ ...prevData, following: parsedEventValue }));
					localStorage.setItem(CACHE_KEYS.FOLLOWING, JSON.stringify(parsedEventValue));
				},
				[CACHE_KEYS.NOT_MUTUALS]: () => {
					setData((prevData) => ({ ...prevData, notMutuals: parsedEventValue }));
					localStorage.setItem(CACHE_KEYS.NOT_MUTUALS, JSON.stringify(parsedEventValue));
				},
				[CACHE_KEYS.UNFOLLOWERS]: () => {
					setData((prevData) => ({ ...prevData, unfollowers: parsedEventValue }));
					localStorage.setItem(CACHE_KEYS.UNFOLLOWERS, JSON.stringify(parsedEventValue));
				},
				[CACHE_KEYS.WHITELIST]: () => {
					setWhitelistIDs(parsedEventValue);
					localStorage.setItem(CACHE_KEYS.WHITELIST, JSON.stringify(parsedEventValue));
				}
			};

			return eventMap?.[event.key]?.();
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
