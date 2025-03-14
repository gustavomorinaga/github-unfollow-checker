'use client';

import React from 'react';

import { DataTable, type RowSelectionState } from '$lib/components/ui/data-table';
import { Spinner } from '$lib/components/ui/spinner';
import { UnfollowersToolbar as Toolbar } from '$lib/features/unfollowers/components/unfollowers-toolbar';
import { useWhitelist } from '$lib/features/whitelist/hooks';
import { cn } from '$lib/utils/ui';

import { columns, type TUser } from './columns';

type TUnfollowersDataTableProps = React.ComponentProps<'div'> & {
	/**
	 * Array of user data to display in the table.
	 */
	data?: Array<TUser>;
	/**
	 * Whether the table is in a pending state.
	 */
	pending?: boolean;
	/**
	 * Callback to refresh the unfollowers.
	 */
	onRefresh: () => void;
};

/**
 * The `UnfollowersDataTable` component renders a data table of unfollowers.
 *
 * @returns The rendered `UnfollowersDataTable` component.
 */
function UnfollowersDataTable({
	className,
	data = [],
	pending = false,
	onRefresh,
	...props
}: TUnfollowersDataTableProps) {
	const { whitelist, addToWhitelist } = useWhitelist();
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

	const dataWithoutWhitelisted = React.useMemo(() => {
		if (!data.length) return [];
		return data.filter((user) => !whitelist.includes(user.id));
	}, [data, whitelist]);

	const selectedRecords = React.useMemo(() => {
		if (!dataWithoutWhitelisted.length) return [];
		return Object.keys(rowSelection).map((key) => dataWithoutWhitelisted[key]);
	}, [rowSelection, dataWithoutWhitelisted]);

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

	return (
		<div className={cn('flex flex-col gap-2', className)} {...props}>
			<Toolbar
				pending={pending}
				selectedRecords={selectedRecords}
				totalRecords={dataWithoutWhitelisted.length}
				onAddToWhitelist={handleAddToWhitelist}
				onRefresh={onRefresh}
			/>

			<DataTable
				columns={columns}
				data={pending ? [] : dataWithoutWhitelisted}
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
