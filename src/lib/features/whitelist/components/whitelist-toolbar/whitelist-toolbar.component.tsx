'use client';

import React from 'react';

import { Button } from '$lib/components/ui/button';
import { toast } from '$lib/components/ui/sonner';
import { useData } from '$lib/contexts/data';
import { useDataTable } from '$lib/features/shared/components/base-data-table/base-data-table-context';
import { BaseDataTableToolbar } from '$lib/features/shared/components/base-data-table/base-data-table-toolbar';
import { ManageUsersConfirmationDialog } from '$lib/features/shared/components/manage-users-confirmation-dialog';
import { RefreshButton } from '$lib/features/shared/components/refresh-button';
import type { TUser } from '$lib/types';

import { BookMinus, UserRoundMinus } from 'lucide-react';

export type TWhitelistToolbarProps = React.ComponentProps<'header'>;

/**
 * The `WhitelistToolbar` component renders a toolbar for managing the whitelist.
 *
 * @returns The rendered toolbar component.
 */
export function WhitelistToolbar(props: TWhitelistToolbarProps) {
	const { table } = useDataTable<TUser>();
	const { pending, refresh, addToWhitelist, removeFromWhitelist, follow, unfollow } = useData();

	async function handleRemoveSelectedUsersFromWhitelist() {
		const { rows } = table.getSelectedRowModel();
		if (!rows.length) return;

		const selectedUserIDs = rows.map((row) => row.original.id);
		await removeFromWhitelist(selectedUserIDs);

		table.toggleAllRowsSelected(false);

		toast.success(`Removed ${rows.length} user(s) from the whitelist.`, {
			action: {
				label: 'Undo',
				onClick: async () => {
					await addToWhitelist(selectedUserIDs);
					toast.success(`Re-added ${rows.length} user(s) to the whitelist.`);
				}
			}
		});
	}

	async function handleUnfollowSelectedUsers() {
		const { rows } = table.getSelectedRowModel();
		if (!rows.length) return;

		const selectedUsernames = rows.map((user) => user.original.login);
		await unfollow(selectedUsernames);

		table.toggleAllRowsSelected(false);

		toast.success(`Unfollowed ${rows.length} user(s).`, {
			action: {
				label: 'Undo',
				onClick: async () => {
					await follow(selectedUsernames);
					toast.success(`Re-followed ${rows.length} user(s).`);
				}
			}
		});
	}

	async function handleRefresh() {
		table.toggleAllRowsSelected(false);
		return refresh();
	}

	return (
		<BaseDataTableToolbar {...props}>
			<ManageUsersConfirmationDialog
				action='blacklist'
				onConfirm={handleRemoveSelectedUsersFromWhitelist}
			>
				<Button
					size='sm'
					variant='outline'
					aria-label='Remove selected'
					title='Remove selected'
					disabled={!table.getSelectedRowModel().rows.length}
					className='size-9 p-0 md:w-auto md:px-3'
				>
					<BookMinus className='block md:hidden' />
					<span className='sr-only select-none md:not-sr-only'>Remove selected</span>
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
