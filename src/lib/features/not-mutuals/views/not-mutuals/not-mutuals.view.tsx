'use client';

import { NotMutualsDataTable } from '$lib/features/not-mutuals/components/not-mutuals-table';

/**
 * The view component for the not mutuals feature.
 *
 * @returns The rendered view component.
 */
export function NotMutualsView() {
	return (
		<NotMutualsDataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent [&>div]:overflow-hidden [&>header]:absolute [&>header]:top-[22.5px] [&>header]:right-2 [&>header]:left-10 [&>header]:z-20 md:[&>header]:left-16 [&>header_button]:rounded-sm [&>header_div[data-slot="toolbar-actions"]>button]:disabled:invisible' />
	);
}
