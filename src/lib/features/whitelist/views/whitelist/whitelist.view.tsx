'use client';

import { WhitelistDataTable } from '$lib/features/whitelist/components/whitelist-table';

/**
 * The view component for the Whitelist feature.
 *
 * @returns The rendered Whitelist view component.
 */
export function WhitelistView() {
	return (
		<WhitelistDataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent [&>div>header]:absolute [&>div>header]:top-[22.5px] [&>div>header]:right-2 [&>div>header]:left-10 [&>div>header]:z-20 md:[&>div>header]:left-16 [&>div>header_button]:rounded-sm [&>div>header_div[data-slot="toolbar-actions"]>button]:disabled:invisible' />
	);
}
