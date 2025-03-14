'use client';

import { UnfollowersDataTable } from '$lib/features/unfollowers/components/unfollowers-table';

/**
 * The view component for the Unfollowers feature.
 *
 * @returns The rendered Unfollowers view component.
 */
export function UnfollowersView() {
	return (
		<UnfollowersDataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent [&>div]:overflow-hidden [&>header]:absolute [&>header]:top-[22.5px] [&>header]:right-2 [&>header]:left-10 [&>header]:z-20 md:[&>header]:left-15 [&>header_button]:rounded-sm [&>header_div[data-slot="toolbar-actions"]>button]:disabled:invisible' />
	);
}
