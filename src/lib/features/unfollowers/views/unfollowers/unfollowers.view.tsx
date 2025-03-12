'use client';

import { UnfollowersDataTable } from '$lib/features/unfollowers/components/unfollowers-table';
import { useUnfollowers } from '$lib/features/unfollowers/hooks';

/**
 * Fetches data and renders the `UnfollowersDataTable` component with the retrieved data.
 *
 * @returns A promise that resolves to the `UnfollowersDataTable` component.
 */
export function UnfollowersView() {
	const { unfollowers, pending, refresh } = useUnfollowers();

	return (
		<UnfollowersDataTable
			data={unfollowers || undefined}
			pending={pending}
			onRefresh={refresh}
			className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent [&>div]:overflow-hidden [&>header]:absolute [&>header]:top-[22.5px] [&>header]:right-2 [&>header]:left-10 [&>header]:z-20 md:[&>header]:left-15 [&>header_button]:rounded-sm'
		/>
	);
}
