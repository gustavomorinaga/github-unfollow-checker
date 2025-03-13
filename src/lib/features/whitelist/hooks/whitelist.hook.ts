'use client';

import React from 'react';

import type { TUser } from '$lib/types';

type TUseWhitelist = () => {
	/**
	 * The current whitelist array.
	 */
	whitelist: Array<TUser['id']>;
	/**
	 * Function to add a user to the whitelist.
	 */
	addToWhitelist: (idOrIDs: TUser['id'] | Array<TUser['id']>) => void;
	/**
	 * Function to remove a user from the whitelist by username.
	 */
	removeFromWhitelist: (idOrIDs: TUser['id'] | Array<TUser['id']>) => void;
	/**
	 * Function to clear the entire whitelist.
	 */
	clearWhitelist: () => void;
};

/**
 * Custom hook to manage a whitelist of users stored in localStorage.
 */
export const useWhitelist: TUseWhitelist = () => {
	const [whitelist, setWhitelist] = React.useState<Array<TUser['id']>>(() => {
		const storedWhitelist =
			typeof localStorage !== 'undefined' ? localStorage.getItem('whitelist') : null;
		if (storedWhitelist) return JSON.parse(storedWhitelist);
		return [];
	});

	React.useEffect(() => {
		function handleStorageEvent(event: StorageEvent) {
			const isWhitelistKey = event.key === 'whitelist';
			if (isWhitelistKey) setWhitelist(JSON.parse(event.newValue || '[]'));
		}

		window.addEventListener('storage', handleStorageEvent);

		return () => {
			window.removeEventListener('storage', handleStorageEvent);
		};
	}, []);

	const addToWhitelist = React.useCallback((idOrIDs: TUser['id'] | Array<TUser['id']>) => {
		setWhitelist((prevWhitelist) => {
			const usersToAdd = Array.isArray(idOrIDs) ? idOrIDs : [idOrIDs];
			const newWhitelist = [
				...prevWhitelist,
				...usersToAdd.filter((id) => !prevWhitelist.includes(id))
			];
			localStorage.setItem('whitelist', JSON.stringify(newWhitelist));
			return newWhitelist;
		});
	}, []);

	const removeFromWhitelist = React.useCallback((idOrIDs: TUser['id'] | Array<TUser['id']>) => {
		setWhitelist((prevWhitelist) => {
			const idsToRemove = Array.isArray(idOrIDs) ? idOrIDs : [idOrIDs];
			const newWhitelist = prevWhitelist.filter((item) => !idsToRemove.includes(item));
			localStorage.setItem('whitelist', JSON.stringify(newWhitelist));
			return newWhitelist;
		});
	}, []);

	const clearWhitelist = React.useCallback(() => {
		setWhitelist([]);
		localStorage.removeItem('whitelist');
	}, []);

	return { whitelist, addToWhitelist, removeFromWhitelist, clearWhitelist };
};
