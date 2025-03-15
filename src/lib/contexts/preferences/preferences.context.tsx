'use client';

import React from 'react';

type TData = { pageSize: number };

const INITIAL_DATA: TData = { pageSize: 15 };
const CACHE_KEY = 'preferences';

type TPreferencesContext = {
	/**
	 * The user preferences.
	 */
	preferences: TData;
	/**
	 * An array of available page size options.
	 */
	pageSizeOptions: ReadonlyArray<number>;
	/**
	 * Function to save the user preferences.
	 */
	savePreferences: (data: TData) => void;
};

const PreferencesContext = React.createContext<TPreferencesContext | undefined>(undefined);

/**
 * Provides preferences context to its children components.
 *
 * @returns The provider component wrapping its children with preferences context.
 *
 * @remarks
 * - The preferences context is used to store user preferences such as the number of rows to display per page.
 * - The preferences are stored in the browser's local storage and are shared across the application.
 */
export function PreferencesProvider({ children }: React.PropsWithChildren) {
	const pageSizeOptions: TPreferencesContext['pageSizeOptions'] = [15, 25, 50];

	const [preferences, setPreferences] = React.useState<TData>(() => {
		const isLocalStorageAvailable = typeof localStorage !== 'undefined';
		const data = isLocalStorageAvailable ? localStorage.getItem(CACHE_KEY) : null;
		if (data) return JSON.parse(data);

		if (isLocalStorageAvailable) localStorage.setItem(CACHE_KEY, JSON.stringify(INITIAL_DATA));

		return INITIAL_DATA;
	});

	const savePreferences = React.useCallback(
		(data: TData) => {
			setPreferences(data);
			localStorage.setItem(CACHE_KEY, JSON.stringify(data));
		},
		[setPreferences]
	);

	React.useEffect(() => {
		function setCachedPreferences(serializedData: string = '{}') {
			const parsedData = JSON.parse(serializedData);
			const isValidPageSize = pageSizeOptions.includes(parsedData.pageSize);

			if (isValidPageSize) setPreferences(parsedData);
		}

		function handleStorageEvent(event: StorageEvent) {
			if (event.key === CACHE_KEY && event.newValue) setCachedPreferences(event.newValue);
		}

		window.addEventListener('storage', handleStorageEvent);

		return () => {
			window.removeEventListener('storage', handleStorageEvent);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const value: TPreferencesContext = { preferences, pageSizeOptions, savePreferences };

	return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

/**
 * Custom hook to access the PreferencesContext.
 *
 * This hook provides access to the preferences stored in the PreferencesContext. It must be used within a PreferencesProvider,
 * otherwise it will throw an error.
 *
 * @returns The current context value for PreferencesContext.
 * @throws If the hook is used outside of a PreferencesProvider.
 */
export function usePreferences() {
	const context = React.useContext(PreferencesContext);
	if (!context) throw new Error('usePreferences must be used within a PreferencesProvider');

	return context;
}
