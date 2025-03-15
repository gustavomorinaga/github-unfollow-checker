'use client';

import React from 'react';

import { Button } from '$lib/components/ui/button';
import { useData } from '$lib/contexts/data';
import { useDataTable } from '$lib/features/shared/components/base-table/base-data-table-context';
import { BaseDataTableToolbar } from '$lib/features/shared/components/base-table/base-data-table-toolbar';
import type { TUser } from '$lib/types';

import { RotateCw } from 'lucide-react';

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
					disabled={!table.getSelectedRowModel().rows.length}
					onClick={handleRemoveSelectedUsersFromWhitelist}
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
					<Button size='icon' variant='ghost' disabled={pending} onClick={refresh}>
						<RotateCw />
					</Button>
				</div>
			</div>
		</BaseDataTableToolbar>
	);
}
