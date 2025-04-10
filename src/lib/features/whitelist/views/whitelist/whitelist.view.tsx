'use client';

import dynamic from 'next/dynamic';

import { BaseDataTableSkeleton } from '$lib/features/shared/components/base-data-table/base-data-table-skeleton';

const DataTable = dynamic(
	() =>
		import('$lib/features/whitelist/components/whitelist-table').then(
			(module) => module.WhitelistDataTable
		),
	{
		ssr: false,
		loading: () => <BaseDataTableSkeleton />
	}
);

/**
 * The view component for the Whitelist feature.
 *
 * @returns The rendered Whitelist view component.
 */
export function WhitelistView() {
	return <DataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent' />;
}
