'use client';

import React from 'react';

import { Spinner } from '$lib/components/ui/spinner';
import { useData } from '$lib/contexts/data';
import { DataTable } from '$lib/features/shared/components/base-table/base-data-table';
import { FollowersToolbar as Toolbar } from '$lib/features/followers/components/followers-toolbar';
import { cn } from '$lib/utils/ui';

import { columns } from './columns';

type TFollowersDataTableProps = React.ComponentProps<'div'>;

/**
 * The `FollowersDataTable` component renders a data table of followers.
 *
 * @returns The rendered `FollowersDataTable` component.
 */
function FollowersDataTable({ className, ...props }: TFollowersDataTableProps) {
	const { data, pending, whitelistIDs } = useData();

	const followers = React.useMemo(() => {
		if (!data.followers.length) return [];
		return data.followers.filter((user) => !whitelistIDs.includes(user.id));
	}, [data.followers, whitelistIDs]);

	const memoizedFeedback = React.useMemo(() => {
		return (
			<div className='flex size-full items-center justify-center gap-2'>
				{pending && <Spinner />}
				{pending ? 'Loading followers...' : 'No followers found. Why not follow someone? 🤔'}
			</div>
		);
	}, [pending]);

	return (
		<div className={cn('flex flex-col gap-2', className)} {...props}>
			<DataTable
				columns={columns}
				data={pending ? [] : followers}
				feedback={memoizedFeedback}
				className='[&_table]:table-fixed [&_tbody_td_span[data-slot="badge"]]:invisible md:[&_tbody_td_span[data-slot="badge"]]:visible [&_thead_th:not(:has(button[role=checkbox]))_span]:sr-only [&>div]:rounded-none [&>div]:border-x-0 [&>div]:border-y md:[&>div]:rounded-md md:[&>div]:border-x'
			>
				<Toolbar />
			</DataTable>
		</div>
	);
}

const MemoizedFollowersDataTable = React.memo(FollowersDataTable);

export { MemoizedFollowersDataTable as FollowersDataTable };
