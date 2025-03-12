'use client';

import { DataTable, type RowSelectionState } from '$lib/components/ui/data-table';
import { UnfollowersToolbar as Toolbar } from '$lib/features/unfollowers/components/unfollowers-toolbar';
import { useWhitelist } from '$lib/features/whitelist/hooks';
import { cn } from '$lib/utils/ui';
import React from 'react';
import { columns, type TUser } from './columns';

/**
 * The `UnfollowersDataTable` component renders a data table of unfollowers.
 *
 * @param className - Additional CSS classes to apply to the component.
 * @param data - Array of user data to display in the table.
 * @param props - Additional props to pass to the component.
 *
 * @returns The rendered UnfollowersDataTable component.
 */
export function UnfollowersDataTable({
	className,
	data = [],
	pending = false,
	onRefresh,
	...props
}: React.ComponentProps<'div'> & {
	data?: Array<TUser>;
	pending?: boolean;
	onRefresh: () => void;
}) {
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
				data={dataWithoutWhitelisted}
				feedback={pending ? 'Loading unfollowers...' : 'No unfollowers found. Very nice! ✨'}
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
				className='[&_thead_th:not(:has(button[role=checkbox]))_span]:sr-only'
			/>
		</div>
	);
}
