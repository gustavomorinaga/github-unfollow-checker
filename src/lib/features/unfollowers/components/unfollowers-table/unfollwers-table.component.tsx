'use client';

import React from 'react';
import { DataTable, type RowSelectionState } from '$lib/components/ui/data-table';
import { UnfollowersToolbar as Toolbar } from '$lib/features/unfollowers/components/unfollowers-toolbar';
import { columns, type TUser } from './columns';
import { cn } from '$lib/utils/ui';

export function UnfollowersDataTable({
	className,
	data,
	...props
}: React.HTMLAttributes<HTMLDivElement> & { data: Array<TUser> }) {
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

	return (
		<div className={cn('flex flex-col gap-2', className)} {...props}>
			<Toolbar rowSelection={rowSelection} />

			<DataTable
				columns={columns}
				data={data}
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
				className='[&_thead_th:not(:has(button[role=checkbox]))_span]:sr-only'
			/>
		</div>
	);
}
