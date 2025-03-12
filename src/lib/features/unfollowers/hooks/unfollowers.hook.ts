'use client';

import type { TUser } from '$lib/types';
import { catchError } from '$lib/utils/errors';
import { useSession } from 'next-auth/react';
import React from 'react';

export function useUnfollowers() {
	const { data: session } = useSession();
	const [unfollowers, setUnfollowers] = React.useState<TUser[] | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [pending, setPending] = React.useState<boolean>(true);

	const fetchUnfollowers = React.useCallback(async () => {
		setPending(true);

		const isAccessTokenMissing = !session?.accessToken;
		const isUserNotAuthenticated = !session?.user;
		if (isAccessTokenMissing && isUserNotAuthenticated) {
			setError('User not authenticated');
			setPending(false);
			return;
		}

		const apiURL = new URL(`/api/${session.user.login}/unfollowers`, location.origin);

		const fetcher = fetch(apiURL, {
			headers: { Authorization: `Bearer ${session.accessToken}` },
			cache: 'force-cache'
		}).then<Array<TUser>>((res) => res.json());

		const [fetchError, data] = await catchError(fetcher);

		if (fetchError) setError(fetchError.message);
		else setUnfollowers(data);

		setPending(false);
	}, [session?.accessToken, session?.user]);

	React.useEffect(() => {
		fetchUnfollowers();
	}, [fetchUnfollowers]);

	return { unfollowers, error, pending, refresh: fetchUnfollowers };
}
