'use client';

import React from 'react';

import { Button } from '$lib/components/ui/button';
import { useData } from '$lib/contexts/data';
import { useDataTable } from '$lib/features/shared/components/base-table/base-data-table-context';
import { BaseDataTableToolbar } from '$lib/features/shared/components/base-table/base-data-table-toolbar';
import type { TUser } from '$lib/types';

import { RotateCw } from 'lucide-react';

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
					disabled={!table.getSelectedRowModel().rows.length}
					onClick={handleWhitelistSelectedUsers}
				>
					<span className='select-none'>Whitelist selected</span>
				</Button>

				<Button
					size='sm'
					disabled={!table.getSelectedRowModel().rows.length}
					onClick={handleFollowSelectedUsers}
				>
					<span className='select-none'>Follow selected</span>
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
