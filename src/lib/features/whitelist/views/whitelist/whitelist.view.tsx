'use client';

import dynamic from 'next/dynamic';

const DataTable = dynamic(
	() =>
		import('$lib/features/whitelist/components/whitelist-table').then(
			(module) => module.WhitelistDataTable
		),
	{ ssr: false }
);

/**
 * The view component for the Whitelist feature.
 *
 * @returns The rendered Whitelist view component.
 */
export function WhitelistView() {
	return <DataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent' />;
}
