'use client';

import React from 'react';

import { Button } from '$lib/components/ui/button';
import { useData } from '$lib/contexts/data';
import { useDataTable } from '$lib/features/shared/components/base-table/base-data-table-context';
import { BaseDataTableToolbar } from '$lib/features/shared/components/base-table/base-data-table-toolbar';
import { RefreshButton } from '$lib/features/shared/components/refresh-button';
import type { TUser } from '$lib/types';

import { UserRoundCheck, UserRoundPlus } from 'lucide-react';

export type TNotMutualsToolbarProps = React.ComponentProps<'header'>;

/**
 * The `NotMutualsToolbar` component renders a toolbar for managing the not mutuals list.
 *
 * @returns The rendered toolbar component.
 */
export function NotMutualsToolbar(props: TNotMutualsToolbarProps) {
	const { table } = useDataTable<TUser>();
	const { pending, refresh, addToWhitelist, follow } = useData();

	function handleWhitelistSelectedUsers() {
		const { rows } = table.getSelectedRowModel();
		if (!rows.length) return;

		const selectedUserIDs = rows.map((row) => row.original.id);
		addToWhitelist(selectedUserIDs);
		table.toggleAllRowsSelected(false);
	}

	function handleFollowSelectedUsers() {
		const { rows } = table.getSelectedRowModel();
		if (!rows.length) return;

		const selectedUsernames = rows.map((user) => user.original.login);
		follow(selectedUsernames);
		table.toggleAllRowsSelected(false);
	}

	return (
		<BaseDataTableToolbar {...props}>
			<div data-slot='toolbar-actions' className='flex items-center gap-2'>
				<Button
					size='sm'
					variant='outline'
					aria-label='Whitelist selected'
					disabled={!table.getSelectedRowModel().rows.length}
					onClick={handleWhitelistSelectedUsers}
					className='size-9 p-0 md:w-auto md:px-3'
				>
					<UserRoundPlus className='block md:hidden' />
					<span className='sr-only select-none md:not-sr-only'>Whitelist selected</span>
				</Button>

				<Button
					size='sm'
					aria-label='Follow selected'
					disabled={!table.getSelectedRowModel().rows.length}
					onClick={handleFollowSelectedUsers}
					className='size-9 p-0 md:w-auto md:px-3'
				>
					<UserRoundCheck className='block md:hidden' />
					<span className='sr-only select-none md:not-sr-only'>Follow selected</span>
				</Button>

				<div className='contents'>
					<RefreshButton disabled={pending} onClick={refresh} />
				</div>
			</div>
		</BaseDataTableToolbar>
	);
}
