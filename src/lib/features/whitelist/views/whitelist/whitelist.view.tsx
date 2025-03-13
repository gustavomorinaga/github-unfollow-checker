'use client';

import { WhitelistDataTable } from '$lib/features/whitelist/components/whitelist-table';
import { useUnfollowers } from '$lib/features/unfollowers/hooks';

/**
 * Fetches data and renders the `WhitelistDataTable` component with the retrieved data.
 *
 * @returns A promise that resolves to the `WhitelistDataTable` component.
 */
export function WhitelistView() {
	const { data, pending, refresh } = useUnfollowers();

	return (
		<WhitelistDataTable
			data={data || undefined}
			pending={pending}
			onRefresh={refresh}
			className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent [&>div]:overflow-hidden [&>header]:absolute [&>header]:top-[22.5px] [&>header]:right-2 [&>header]:left-10 [&>header]:z-20 md:[&>header]:left-15 [&>header_button]:rounded-sm [&>header_div[data-slot="toolbar-actions"]>button]:disabled:invisible'
		/>
	);
}
