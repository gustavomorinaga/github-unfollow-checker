'use client';

import React from 'react';

import { Spinner } from '$lib/components/ui/spinner';
import { useData } from '$lib/contexts/data';
import { DataTable } from '$lib/features/shared/components/base-data-table/base-data-table';
import { UnfollowersToolbar as Toolbar } from '$lib/features/unfollowers/components/unfollowers-toolbar';
import { cn } from '$lib/utils/ui';

import { columns } from './columns';

type TUnfollowersDataTableProps = React.ComponentProps<'div'>;

/**
 * The `UnfollowersDataTable` component renders a data table of unfollowers.
 *
 * @returns The rendered `UnfollowersDataTable` component.
 */
function UnfollowersDataTable({ className, ...props }: TUnfollowersDataTableProps) {
	const { data, pending, whitelistIDs } = useData();

	const unfollowers = React.useMemo(() => {
		if (!data.unfollowers.length) return [];
		return data.unfollowers.filter((user) => !whitelistIDs.includes(user.id));
	}, [data.unfollowers, whitelistIDs]);

	const memoizedFeedback = React.useMemo(() => {
		return (
			<div className='flex size-full items-center justify-center gap-2'>
				{pending && <Spinner />}
				{pending ? 'Loading unfollowers...' : 'No unfollowers found. Very nice! ✨'}
			</div>
		);
	}, [pending]);

	return (
		<div className={cn('flex flex-col gap-2', className)} {...props}>
			<DataTable
				columns={columns}
				data={pending ? [] : unfollowers}
				feedback={memoizedFeedback}
				className='[&_thead_th:not(:has(button[role=checkbox]))_span]:sr-only [&>div]:rounded-none [&>div]:border-x-0 [&>div]:border-y md:[&>div]:rounded-md md:[&>div]:border-x'
			>
				<Toolbar />
			</DataTable>
		</div>
	);
}

const MemoizedUnfollowersDataTable = React.memo(UnfollowersDataTable);

export { MemoizedUnfollowersDataTable as UnfollowersDataTable };
