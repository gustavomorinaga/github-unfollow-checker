'use client';

import { FollowersDataTable as DataTable } from '$lib/features/followers/components/followers-table';

/**
 * The view component for the Followers feature.
 *
 * @returns The rendered Followers view component.
 */
export function FollowersView() {
	return <DataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent' />;
}
