'use client';

import React from 'react';

import { DataTable, type RowSelectionState } from '$lib/components/ui/data-table';
import { Spinner } from '$lib/components/ui/spinner';
import { useData } from '$lib/contexts/data';
import { NotMutualsToolbar as Toolbar } from '$lib/features/not-mutuals/components/not-mutuals-toolbar';
import { cn } from '$lib/utils/ui';

import { columns, type TUser } from './columns';

type TNotMutualsDataTableProps = React.ComponentProps<'div'>;

/**
 * The `NotMutualsDataTable` component renders a data table of unfollowers.
 *
 * @returns The rendered `NotMutualsDataTable` component.
 */
function NotMutualsDataTable({ className, ...props }: TNotMutualsDataTableProps) {
	const { data, pending, whitelistIDs, addToWhitelist, unfollow } = useData();
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

	const notMutuals = React.useMemo(() => {
		if (!data.notMutuals.length) return [];
		return data.notMutuals.filter((user) => !whitelistIDs.includes(user.id));
	}, [data.notMutuals, whitelistIDs]);

	const selectedRecords = React.useMemo(() => {
		if (!notMutuals.length) return [];
		return Object.keys(rowSelection).map<TUser>((key) => notMutuals[key]);
	}, [notMutuals, rowSelection]);

	const memoizedFeedback = React.useMemo(() => {
		return (
			<div className='flex size-full items-center justify-center gap-2'>
				{pending && <Spinner />}
				{pending ? 'Loading not mutuals...' : 'No not mutuals found. Very nice! ✨'}
			</div>
		);
	}, [pending]);

	function handleAddToWhitelist() {
		if (!selectedRecords.length) return;
		const selectedUserIDs = selectedRecords.map((user) => user.id);
		addToWhitelist(selectedUserIDs);
		setRowSelection({});
	}

	function handleFollow() {
		if (!selectedRecords.length) return;
		const selectedUsernames = selectedRecords.map((user) => user.login);
		unfollow(selectedUsernames);
		setRowSelection({});
	}

	return (
		<div className={cn('flex flex-col gap-2', className)} {...props}>
			<Toolbar
				selectedRecords={selectedRecords}
				totalRecords={notMutuals.length}
				onAddToWhitelist={handleAddToWhitelist}
				onFollow={handleFollow}
			/>

			<DataTable
				columns={columns}
				data={pending ? [] : notMutuals}
				feedback={memoizedFeedback}
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
				className='rounded-none border-x-0 border-y md:rounded-md md:border-x [&_table]:table-fixed [&_tbody_td_span[data-slot="badge"]]:invisible md:[&_tbody_td_span[data-slot="badge"]]:visible [&_thead_th:not(:has(button[role=checkbox]))_span]:sr-only'
			/>
		</div>
	);
}

const MemoizedNotMutualsDataTable = React.memo(NotMutualsDataTable);

export { MemoizedNotMutualsDataTable as NotMutualsDataTable };
