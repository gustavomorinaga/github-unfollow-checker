'use client';

import dynamic from 'next/dynamic';

const DataTable = dynamic(
	() =>
		import('$lib/features/followers/components/followers-table').then(
			(module) => module.FollowersDataTable
		),
	{ ssr: false }
);

/**
 * The view component for the Followers feature.
 *
 * @returns The rendered Followers view component.
 */
export function FollowersView() {
	return <DataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent' />;
}
