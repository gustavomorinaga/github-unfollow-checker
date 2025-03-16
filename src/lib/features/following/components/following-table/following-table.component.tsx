'use client';

import React from 'react';

import { Spinner } from '$lib/components/ui/spinner';
import { useData } from '$lib/contexts/data';
import { DataTable } from '$lib/features/shared/components/base-data-table/base-data-table';
import { FollowingToolbar as Toolbar } from '$lib/features/following/components/following-toolbar';
import { cn } from '$lib/utils/ui';

import { columns } from './columns';

type TFollowingDataTableProps = React.ComponentProps<'div'>;

/**
 * The `FollowingDataTable` component renders a data table of following users.
 *
 * @returns The rendered `FollowingDataTable` component.
 */
function FollowingDataTable({ className, ...props }: TFollowingDataTableProps) {
	const { data, pending } = useData();

	const memoizedFeedback = React.useMemo(() => {
		return (
			<div className='flex size-full items-center justify-center gap-2'>
				{pending && <Spinner />}
				{pending ? 'Loading following...' : 'No following found. Why not follow someone? 🤔'}
			</div>
		);
	}, [pending]);

	return (
		<div className={cn('flex flex-col gap-2', className)} {...props}>
			<DataTable
				columns={columns}
				data={pending ? [] : data.following}
				feedback={memoizedFeedback}
				className='[&_thead_th:not(:has(button[role=checkbox]))_span]:sr-only [&>div]:rounded-none [&>div]:border-x-0 [&>div]:border-y md:[&>div]:rounded-md md:[&>div]:border-x'
			>
				<Toolbar />
			</DataTable>
		</div>
	);
}

const MemoizedFollowersDataTable = React.memo(FollowingDataTable);

export { MemoizedFollowersDataTable as FollowingDataTable };
