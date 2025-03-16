'use client';

import React from 'react';

import { Button } from '$lib/components/ui/button';
import { useData } from '$lib/contexts/data';
import { useDataTable } from '$lib/features/shared/components/base-table/base-data-table-context';
import { BaseDataTableToolbar } from '$lib/features/shared/components/base-table/base-data-table-toolbar';
import { RefreshButton } from '$lib/features/shared/components/refresh-button';
import type { TUser } from '$lib/types';

import { UserRoundMinus, UserRoundX } from 'lucide-react';

export type TWhitelistToolbarProps = React.ComponentProps<'header'>;

/**
 * The `WhitelistToolbar` component renders a toolbar for managing the whitelist.
 *
 * @returns The rendered toolbar component.
 */
export function WhitelistToolbar(props: TWhitelistToolbarProps) {
	const { table } = useDataTable<TUser>();
	const { pending, refresh, removeFromWhitelist, unfollow } = useData();

	function handleRemoveSelectedUsersFromWhitelist() {
		const { rows } = table.getSelectedRowModel();
		if (!rows.length) return;

		const selectedUserIDs = rows.map((row) => row.original.id);
		removeFromWhitelist(selectedUserIDs);
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
			<div data-slot='toolbar-actions' className='flex items-center gap-2'>
				<Button
					size='sm'
					variant='outline'
					aria-label='Remove selected'
					title='Remove selected'
					disabled={!table.getSelectedRowModel().rows.length}
					onClick={handleRemoveSelectedUsersFromWhitelist}
					className='size-9 p-0 md:w-auto md:px-3'
				>
					<UserRoundMinus className='block md:hidden' />
					<span className='sr-only select-none md:not-sr-only'>Remove selected</span>
				</Button>

				<Button
					size='sm'
					variant='destructive'
					aria-label='Unfollow selected'
					title='Unfollow selected'
					disabled={!table.getSelectedRowModel().rows.length}
					onClick={handleUnfollowSelectedUsers}
					className='size-9 p-0 md:w-auto md:px-3'
				>
					<UserRoundX className='block md:hidden' />
					<span className='sr-only select-none md:not-sr-only'>Unfollow selected</span>
				</Button>

				<div className='contents'>
					<RefreshButton disabled={pending} onClick={refresh} />
				</div>
			</div>
		</BaseDataTableToolbar>
	);
}
