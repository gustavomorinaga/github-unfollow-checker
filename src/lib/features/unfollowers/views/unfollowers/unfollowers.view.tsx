'use client';

import { UnfollowersDataTable as DataTable } from '$lib/features/unfollowers/components/unfollowers-table';

/**
 * The view component for the Unfollowers feature.
 *
 * @returns The rendered Unfollowers view component.
 */
export function UnfollowersView() {
	return <DataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent' />;
}
