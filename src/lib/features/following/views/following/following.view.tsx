'use client';

import dynamic from 'next/dynamic';

import { BaseDataTableSkeleton } from '$lib/features/shared/components/base-data-table/base-data-table-skeleton';

const DataTable = dynamic(
	() =>
		import('$lib/features/following/components/following-table').then(
			(module) => module.FollowingDataTable
		),
	{
		ssr: false,
		loading: () => <BaseDataTableSkeleton />
	}
);

/**
 * The view component for the Following feature.
 *
 * @returns The rendered Following view component.
 */
export function FollowingView() {
	return <DataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent' />;
}
