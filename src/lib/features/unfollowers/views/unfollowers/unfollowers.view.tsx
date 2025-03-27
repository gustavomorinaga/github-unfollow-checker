'use client';

import dynamic from 'next/dynamic';

import { BaseDataTableSkeleton } from '$lib/features/shared/components/base-data-table/base-data-table-skeleton';

const DataTable = dynamic(
	() =>
		import('$lib/features/unfollowers/components/unfollowers-table').then(
			(module) => module.UnfollowersDataTable
		),
	{
		ssr: false,
		loading: () => <BaseDataTableSkeleton />
	}
);

/**
 * The view component for the Unfollowers feature.
 *
 * @returns The rendered Unfollowers view component.
 */
export function UnfollowersView() {
	return <DataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent' />;
}
