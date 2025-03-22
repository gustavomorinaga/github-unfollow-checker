'use client';

import { FollowingDataTable as DataTable } from '$lib/features/following/components/following-table';

/**
 * The view component for the Following feature.
 *
 * @returns The rendered Following view component.
 */
export function FollowingView() {
	return <DataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent' />;
}
