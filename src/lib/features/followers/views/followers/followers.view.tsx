'use client';

import dynamic from 'next/dynamic';

import { BaseDataTableSkeleton } from '$lib/features/shared/components/base-data-table/base-data-table-skeleton';

const DataTable = dynamic(
	() =>
		import('$lib/features/followers/components/followers-table').then(
			(module) => module.FollowersDataTable
		),
	{
		ssr: false,
		loading: () => <BaseDataTableSkeleton />
	}
);

/**
 * The view component for the Followers feature.
 *
 * @returns The rendered Followers view component.
 */
export function FollowersView() {
	return <DataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent' />;
}
