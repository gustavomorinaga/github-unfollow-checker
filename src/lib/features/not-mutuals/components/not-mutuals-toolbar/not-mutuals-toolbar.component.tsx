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

import { BookPlus, UserRoundPlus } from 'lucide-react';

export type TNotMutualsToolbarProps = React.ComponentProps<'header'>;

/**
 * The `NotMutualsToolbar` component renders a toolbar for managing the not mutuals list.
 *
 * @returns The rendered toolbar component.
 */
export function NotMutualsToolbar(props: TNotMutualsToolbarProps) {
	const { table } = useDataTable<TUser>();
	const { pending, refresh, addToWhitelist, follow, unfollow } = useData();

	async function handleWhitelistSelectedUsers() {
		const { rows } = table.getSelectedRowModel();
		if (!rows.length) return;

		const selectedUserIDs = rows.map((row) => row.original.id);
		await addToWhitelist(selectedUserIDs);

		table.toggleAllRowsSelected(false);

		toast.success(`Added ${rows.length} user(s) to the whitelist.`);
	}

	async function handleFollowSelectedUsers() {
		const { rows } = table.getSelectedRowModel();
		if (!rows.length) return;

		const selectedUsernames = rows.map((user) => user.original.login);
		await follow(selectedUsernames);

		table.toggleAllRowsSelected(false);

		toast.success(`Followed ${rows.length} user(s).`, {
			action: {
				label: 'Undo',
				onClick: async () => {
					await unfollow(selectedUsernames);
					toast.success(`Unfollowed ${rows.length} user(s).`);
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

			<ManageUsersConfirmationDialog action='follow' onConfirm={handleFollowSelectedUsers}>
				<Button
					size='sm'
					aria-label='Follow selected'
					title='Follow selected'
					disabled={!table.getSelectedRowModel().rows.length}
					className='size-9 p-0 md:w-auto md:px-3'
				>
					<UserRoundPlus className='block md:hidden' />
					<span className='sr-only select-none md:not-sr-only'>Follow selected</span>
				</Button>
			</ManageUsersConfirmationDialog>

			<div className='contents'>
				<RefreshButton disabled={pending} onClick={handleRefresh} />
			</div>
		</BaseDataTableToolbar>
	);
}
