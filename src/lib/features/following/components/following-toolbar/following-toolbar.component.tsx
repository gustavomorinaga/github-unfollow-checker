'use client';

import React from 'react';

import { Button } from '$lib/components/ui/button';
import { useData } from '$lib/contexts/data';
import { useDataTable } from '$lib/features/shared/components/base-data-table/base-data-table-context';
import { BaseDataTableToolbar } from '$lib/features/shared/components/base-data-table/base-data-table-toolbar';
import { ManageUsersConfirmationDialog } from '$lib/features/shared/components/manage-users-confirmation-dialog';
import { RefreshButton } from '$lib/features/shared/components/refresh-button';
import type { TUser } from '$lib/types';

import { BookPlus, UserRoundMinus } from 'lucide-react';

export type TFollowingToolbarProps = React.ComponentProps<'header'>;

/**
 * The `FollowingToolbar` component renders a toolbar for managing followers.
 *
 * @returns The rendered toolbar component.
 */
export function FollowingToolbar(props: TFollowingToolbarProps) {
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

	function handleRefresh() {
		table.toggleAllRowsSelected(false);
		refresh();
	}

	return (
		<BaseDataTableToolbar {...props}>
			<ManageUsersConfirmationDialog action='whitelist' onConfirm={handleWhitelistSelectedUsers}>
				<Button
					size='sm'
					variant='outline'
					aria-label='Whitelist selected'
					title='Whitelist selected'
					disabled={!table.getSelectedRowModel().rows.length}
					className='size-9 p-0 md:w-auto md:px-3'
				>
					<BookPlus className='block md:hidden' />
					<span className='sr-only select-none md:not-sr-only'>Whitelist selected</span>
				</Button>
			</ManageUsersConfirmationDialog>

			<ManageUsersConfirmationDialog action='unfollow' onConfirm={handleUnfollowSelectedUsers}>
				<Button
					size='sm'
					variant='destructive'
					aria-label='Unfollow selected'
					title='Unfollow selected'
					disabled={!table.getSelectedRowModel().rows.length}
					className='size-9 p-0 md:w-auto md:px-3'
				>
					<UserRoundMinus className='block md:hidden' />
					<span className='sr-only select-none md:not-sr-only'>Unfollow selected</span>
				</Button>
			</ManageUsersConfirmationDialog>

			<div className='contents'>
				<RefreshButton disabled={pending} onClick={handleRefresh} />
			</div>
		</BaseDataTableToolbar>
	);
}
