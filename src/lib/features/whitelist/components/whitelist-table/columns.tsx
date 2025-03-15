'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { baseColumns } from '$lib/features/shared/components/base-table/base-data-table-columns';
import { FollowUserButton } from '$lib/features/shared/components/follow-user-button';
import { ViewUserProfileButton } from '$lib/features/shared/components/view-user-profile-button';
import { WhitelistUserButton } from '$lib/features/shared/components/whitelist-user-button';
import type { TUser } from '$lib/types';

/**
 * Defines the columns for the Whitelist Table.
 */
const columns: Array<ColumnDef<TUser>> = [
	...baseColumns,
	{
		id: 'actions',
		size: 48,
		header: () => <span>Actions</span>,
		cell: ({ row: { original: user } }) => {
			return (
				<div className='flex items-center justify-end gap-2'>
					<ViewUserProfileButton user={user} />
					<WhitelistUserButton user={user} action='remove' />
					<FollowUserButton user={user} />
				</div>
			);
		}
	}
];

export { columns, type TUser };
