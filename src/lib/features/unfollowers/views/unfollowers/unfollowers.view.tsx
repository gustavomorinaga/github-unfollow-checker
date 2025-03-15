'use client';

import { UnfollowersDataTable } from '$lib/features/unfollowers/components/unfollowers-table';

/**
 * The view component for the Unfollowers feature.
 *
 * @returns The rendered Unfollowers view component.
 */
export function UnfollowersView() {
	return (
		<UnfollowersDataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent [&>div>header]:absolute [&>div>header]:top-[22.5px] [&>div>header]:right-2 [&>div>header]:left-10 [&>div>header]:z-20 md:[&>div>header]:left-16 [&>div>header_button]:rounded-sm [&>div>header_div[data-slot="toolbar-actions"]>button]:disabled:invisible' />
	);
}
