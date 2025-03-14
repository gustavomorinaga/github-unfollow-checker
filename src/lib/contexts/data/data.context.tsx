'use client';

import React from 'react';

import { useSession } from 'next-auth/react';

import type { TDataResponse } from '$lib/server/repositories/data';
import { catchError } from '$lib/utils/errors';
import { sleep } from '$lib/utils/sleep';

const INITIAL_DATA: TDataResponse = {
	followers: [],
	following: [],
	notMutuals: [],
	unfollowers: []
};
const SLEEP_DURATION = 700;
const CACHE_KEY = 'data';

type TDataContext = {
	/**
	 * The data response from the server.
	 */
	data: TDataResponse;
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
	refresh: () => void;
};

const DataContext = React.createContext<TDataContext | undefined>(undefined);

/**
 * Provides data context to its children components.
 *
 * @returns The provider component wrapping its children with data context.
 *
 * @remarks
 * This component uses the `useSession` hook to get the current session data and manages the state
 * for data, error, and pending status. It fetches data from an API and caches it in local storage.
 * If the user is not authenticated, it sets an error state.
 */
export function DataProvider({ children }: React.PropsWithChildren) {
	const { data: session } = useSession({ required: true });

	const [data, setData] = React.useState<TDataResponse>(INITIAL_DATA);
	const [error, setError] = React.useState<Error | null>(null);
	const [pending, setPending] = React.useState<boolean>(true);

	const fetchData = React.useCallback(
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
					setData(JSON.parse(cachedData));
					sleep(SLEEP_DURATION).then(() => setPending(false));
					return;
				}
			}

			setPending(true);

			const apiURL = new URL(`/api/${session.user.login}/data`, location.origin);

			const fetcher = fetch(apiURL, {
				headers: { Authorization: `Bearer ${session.accessToken}` }
			}).then<TDataResponse>((res) => res.json());

			const [fetchError, data] = await catchError(fetcher);

			if (fetchError) setError(fetchError);
			else {
				setData(data);
				localStorage.setItem(CACHE_KEY, JSON.stringify(data));
			}

			sleep(SLEEP_DURATION).then(() => setPending(false));
		},
		[session?.accessToken, session?.user]
	);

	React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	const value: TDataContext = {
		data,
		error,
		pending,
		refresh: () => fetchData({ refresh: true })
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
