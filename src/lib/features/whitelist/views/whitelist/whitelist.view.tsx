'use client';

import { WhitelistDataTable as DataTable } from '$lib/features/whitelist/components/whitelist-table';

/**
 * The view component for the Whitelist feature.
 *
 * @returns The rendered Whitelist view component.
 */
export function WhitelistView() {
	return <DataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent' />;
}
