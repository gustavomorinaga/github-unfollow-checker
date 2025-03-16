'use client';

import { NotMutualsDataTable } from '$lib/features/not-mutuals/components/not-mutuals-table';

/**
 * The view component for the Not Mutuals feature.
 *
 * @returns The rendered view component.
 */
export function NotMutualsView() {
	return (
		<NotMutualsDataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent [&>div>header]:absolute [&>div>header]:top-[22.5px] [&>div>header]:right-2 [&>div>header]:left-10 [&>div>header]:z-20 md:[&>div>header]:left-16 [&>div>header_button]:rounded-sm [&>div>header_div[data-slot="toolbar-actions"]>button]:disabled:invisible' />
	);
}
