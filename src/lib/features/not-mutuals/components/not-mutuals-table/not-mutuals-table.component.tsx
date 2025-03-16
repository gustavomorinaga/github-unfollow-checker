'use client';

import React from 'react';

import { Spinner } from '$lib/components/ui/spinner';
import { useData } from '$lib/contexts/data';
import { NotMutualsToolbar as Toolbar } from '$lib/features/not-mutuals/components/not-mutuals-toolbar';
import { DataTable } from '$lib/features/shared/components/base-data-table/base-data-table';
import { cn } from '$lib/utils/ui';

import { columns } from './columns';

type TNotMutualsDataTableProps = React.ComponentProps<'div'>;

/**
 * The `NotMutualsDataTable` component renders a data table of unfollowers.
 *
 * @returns The rendered `NotMutualsDataTable` component.
 */
function NotMutualsDataTable({ className, ...props }: TNotMutualsDataTableProps) {
	const { data, pending, whitelistIDs } = useData();

	const notMutuals = React.useMemo(() => {
		if (!data.notMutuals.length) return [];
		return data.notMutuals.filter((user) => !whitelistIDs.includes(user.id));
	}, [data.notMutuals, whitelistIDs]);

	const memoizedFeedback = React.useMemo(() => {
		return (
			<div className='flex size-full items-center justify-center gap-2'>
				{pending && <Spinner />}
				{pending ? 'Loading not mutuals...' : 'No not mutuals found. Very nice! ✨'}
			</div>
		);
	}, [pending]);

	return (
		<div className={cn('flex flex-col gap-2', className)} {...props}>
			<DataTable
				columns={columns}
				data={pending ? [] : notMutuals}
				feedback={memoizedFeedback}
				className='[&_thead_th:not(:has(button[role=checkbox]))_span]:sr-only [&>div]:rounded-none [&>div]:border-x-0 [&>div]:border-y md:[&>div]:rounded-md md:[&>div]:border-x'
			>
				<Toolbar />
			</DataTable>
		</div>
	);
}

const MemoizedNotMutualsDataTable = React.memo(NotMutualsDataTable);

export { MemoizedNotMutualsDataTable as NotMutualsDataTable };
