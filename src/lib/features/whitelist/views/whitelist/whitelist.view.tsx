'use client';

import { useData } from '$lib/contexts/data';
import { WhitelistDataTable } from '$lib/features/whitelist/components/whitelist-table';

/**
 * Fetches data and renders the `WhitelistDataTable` component with the retrieved data.
 *
 * @returns A promise that resolves to the `WhitelistDataTable` component.
 */
export function WhitelistView() {
	const { data, pending, refresh } = useData();

	return (
		<WhitelistDataTable
			data={data.following}
			pending={pending}
			onRefresh={refresh}
			className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent [&>div]:overflow-hidden [&>header]:absolute [&>header]:top-[22.5px] [&>header]:right-2 [&>header]:left-10 [&>header]:z-20 md:[&>header]:left-16 [&>header_button]:rounded-sm [&>header_div[data-slot="toolbar-actions"]>button]:disabled:invisible'
		/>
	);
}
