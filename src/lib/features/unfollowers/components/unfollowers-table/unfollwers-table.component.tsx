'use client';

import { DataTable, type RowSelectionState } from '$lib/components/ui/data-table';
import { getUnfollowers } from '$lib/features/unfollowers/actions';
import { UnfollowersToolbar as Toolbar } from '$lib/features/unfollowers/components/unfollowers-toolbar';
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
	...props
}: React.ComponentProps<'div'> & { data?: Array<TUser> }) {
	const [state, formAction, pending] = React.useActionState(getUnfollowers, { data });
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

	return (
		<div className={cn('flex flex-col gap-2', className)} {...props}>
			<Toolbar pending={pending} rowSelection={rowSelection} onRefresh={formAction} />

			<DataTable
				columns={columns}
				data={state.data as Array<TUser>}
				feedback='No unfollowers found. Very nice! ✨'
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
				className='[&_thead_th:not(:has(button[role=checkbox]))_span]:sr-only'
			/>
		</div>
	);
}
