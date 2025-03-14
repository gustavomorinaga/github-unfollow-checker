'use client';

import React from 'react';

import { DataTable, type RowSelectionState } from '$lib/components/ui/data-table';
import { Spinner } from '$lib/components/ui/spinner';
import { useData } from '$lib/contexts/data';
import { UnfollowersToolbar as Toolbar } from '$lib/features/unfollowers/components/unfollowers-toolbar';
import { cn } from '$lib/utils/ui';

import { columns, type TUser } from './columns';

type TUnfollowersDataTableProps = React.ComponentProps<'div'>;

/**
 * The `UnfollowersDataTable` component renders a data table of unfollowers.
 *
 * @returns The rendered `UnfollowersDataTable` component.
 */
function UnfollowersDataTable({ className, ...props }: TUnfollowersDataTableProps) {
	const { data, pending, whitelistIDs, addToWhitelist, unfollow } = useData();
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

	const unfollowers = React.useMemo(() => {
		if (!data.unfollowers.length) return [];
		return data.unfollowers.filter((user) => !whitelistIDs.includes(user.id));
	}, [data.unfollowers, whitelistIDs]);

	const selectedRecords = React.useMemo(() => {
		if (!unfollowers.length) return [];
		return Object.keys(rowSelection).map<TUser>((key) => unfollowers[key]);
	}, [unfollowers, rowSelection]);

	const memoizedFeedback = React.useMemo(() => {
		return (
			<div className='flex size-full items-center justify-center gap-2'>
				{pending && <Spinner />}
				{pending ? 'Loading unfollowers...' : 'No unfollowers found. Very nice! ✨'}
			</div>
		);
	}, [pending]);

	function handleAddToWhitelist() {
		if (!selectedRecords.length) return;
		const selectedUserIDs = selectedRecords.map((user) => user.id);
		addToWhitelist(selectedUserIDs);
		setRowSelection({});
	}

	function handleUnfollow() {
		if (!selectedRecords.length) return;
		const selectedUsernames = selectedRecords.map((user) => user.login);
		unfollow(selectedUsernames);
		setRowSelection({});
	}

	return (
		<div className={cn('flex flex-col gap-2', className)} {...props}>
			<Toolbar
				selectedRecords={selectedRecords}
				totalRecords={unfollowers.length}
				onAddToWhitelist={handleAddToWhitelist}
				onUnfollow={handleUnfollow}
			/>

			<DataTable
				columns={columns}
				data={pending ? [] : unfollowers}
				feedback={memoizedFeedback}
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
				className='rounded-none border-x-0 border-y md:rounded-md md:border-x [&_table]:table-fixed [&_tbody_td_span[data-slot="badge"]]:invisible md:[&_tbody_td_span[data-slot="badge"]]:visible [&_thead_th:not(:has(button[role=checkbox]))_span]:sr-only'
			/>
		</div>
	);
}

const MemoizedUnfollowersDataTable = React.memo(UnfollowersDataTable);

export { MemoizedUnfollowersDataTable as UnfollowersDataTable };
