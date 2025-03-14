'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { ViewProfileButton } from '$lib/features/shared/components/view-profile-button';
import { baseColumns } from '$lib/features/shared/components/base-table/base-columns';
import { UnfollowUserButton } from '$lib/features/unfollowers/components/unfollow-user-button';
import { WhitelistUserButton } from '$lib/features/whitelist/components/whitelist-user-button';
import type { TUser } from '$lib/types';

/**
 * Defines the columns for the Unfollowers Table.
 */
const columns: Array<ColumnDef<TUser>> = [
	...baseColumns,
	{
		id: 'actions',
		size: 48,
		header: () => <span>Actions</span>,
		cell: ({ row: { original: user } }) => {
			return (
				<div className='w- flex shrink-0 items-center justify-end gap-2'>
					<ViewProfileButton user={user} />
					<WhitelistUserButton user={user} action='add' />
					<UnfollowUserButton user={user} />
				</div>
			);
		}
	}
];

export { columns, type TUser };
