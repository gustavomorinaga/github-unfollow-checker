'use client';

import dynamic from 'next/dynamic';

const DataTable = dynamic(
	() =>
		import('$lib/features/not-mutuals/components/not-mutuals-table').then(
			(module) => module.NotMutualsDataTable
		),
	{ ssr: false }
);

/**
 * The view component for the Not Mutuals feature.
 *
 * @returns The rendered view component.
 */
export function NotMutualsView() {
	return <DataTable className='relative py-4 [&_thead_th]:h-12 [&_thead>tr]:!bg-transparent' />;
}
