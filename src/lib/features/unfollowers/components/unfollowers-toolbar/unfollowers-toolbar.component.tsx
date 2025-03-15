'use client';

import React from 'react';

import { Button } from '$lib/components/ui/button';
import { useData } from '$lib/contexts/data';
import { useDataTable } from '$lib/features/shared/components/base-table/base-data-table-context';
import { BaseDataTableToolbar } from '$lib/features/shared/components/base-table/base-data-table-toolbar';
import { RefreshButton } from '$lib/features/shared/components/refresh-button';
import type { TUser } from '$lib/types';

export type TUnfollowersToolbarProps = React.ComponentProps<'header'>;

/**
 * The `UnfollowersToolbar` component renders a toolbar for managing unfollowers.
 *
 * @returns The rendered toolbar component.
 */
export function UnfollowersToolbar(props: TUnfollowersToolbarProps) {
	const { table } = useDataTable<TUser>();
	const { pending, refresh, addToWhitelist, unfollow } = useData();

	function handleWhitelistSelectedUsers() {
		const { rows } = table.getSelectedRowModel();
		if (!rows.length) return;

		const selectedUserIDs = rows.map((row) => row.original.id);
		addToWhitelist(selectedUserIDs);
		table.toggleAllRowsSelected(false);
	}

	function handleUnfollowSelectedUsers() {
		const { rows } = table.getSelectedRowModel();
		if (!rows.length) return;

		const selectedUsernames = rows.map((user) => user.original.login);
		unfollow(selectedUsernames);
		table.toggleAllRowsSelected(false);
	}

	return (
		<BaseDataTableToolbar {...props}>
			<Button
				size='sm'
				variant='outline'
				disabled={!table.getSelectedRowModel().rows.length}
				onClick={handleWhitelistSelectedUsers}
			>
				Remove selected
			</Button>

			<Button
				size='sm'
				variant='destructive'
				disabled={!table.getSelectedRowModel().rows.length}
				onClick={handleUnfollowSelectedUsers}
			>
				Unfollow selected
			</Button>

			<div className='contents'>
				<RefreshButton disabled={pending} onClick={refresh} />
			</div>
		</BaseDataTableToolbar>
	);
}
