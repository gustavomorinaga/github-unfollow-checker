'use client';

import dynamic from 'next/dynamic';

import { BaseDataTableSkeleton } from '$lib/features/shared/components/base-data-table/base-data-table-skeleton';

const DataTable = dynamic(
	() =>
		import('$lib/features/not-mutuals/components/not-mutuals-table').then(
			(module) => module.NotMutualsDataTable
		),
	{
		ssr: false,
		loading: () => <BaseDataTableSkeleton />
	}
);

/**
 * The view component for the Not Mutuals feature.
 *
 * @returns The rendered view component.
 */
export function NotMutualsView() {
	return <DataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent' />;
}
