'use client';

import React from 'react';
import { DataTable, type RowSelectionState } from '$lib/components/ui/data-table';
import { UnfollowersToolbar as Toolbar } from '$lib/features/unfollowers/components/unfollowers-toolbar';
import { columns, type TUser } from './columns';

export function UnfollowersDataTable({ data }: { data: Array<TUser> }) {
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

	return (
		<div className='relative'>
			<Toolbar rowSelection={rowSelection} className='absolute top-1 left-12 z-10' />

			<DataTable
				columns={columns}
				data={data}
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
				className='[&_thead_th:not(:has(button[role=checkbox]))_span]:sr-only [&_thead>tr]:!bg-transparent'
			/>
		</div>
	);
}
