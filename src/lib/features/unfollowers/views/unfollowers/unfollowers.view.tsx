'use client';

import { useData } from '$lib/contexts/data';
import { UnfollowersDataTable } from '$lib/features/unfollowers/components/unfollowers-table';

/**
 * Fetches data and renders the `UnfollowersDataTable` component with the retrieved data.
 *
 * @returns A promise that resolves to the `UnfollowersDataTable` component.
 */
export function UnfollowersView() {
	const { data, pending, refresh } = useData();

	return (
		<UnfollowersDataTable
			data={data.unfollowers}
			pending={pending}
			onRefresh={refresh}
			className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent [&>div]:overflow-hidden [&>header]:absolute [&>header]:top-[22.5px] [&>header]:right-2 [&>header]:left-10 [&>header]:z-20 md:[&>header]:left-15 [&>header_button]:rounded-sm [&>header_div[data-slot="toolbar-actions"]>button]:disabled:invisible'
		/>
	);
}
