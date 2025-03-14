'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { ViewProfileButton } from '$lib/features/shared/components/view-profile-button';
import { baseColumns } from '$lib/features/shared/components/base-table/base-columns';
import { FollowUserButton } from '$lib/features/not-mutuals/components/follow-user-button';
import { WhitelistUserButton } from '$lib/features/whitelist/components/whitelist-user-button';
import type { TUser } from '$lib/types';

/**
 * Defines the columns for the Not Mutuals Table.
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
					<ViewProfileButton user={user} />
					<WhitelistUserButton user={user} action='remove' />
					<FollowUserButton user={user} />
				</div>
			);
		}
	}
];

export { columns, type TUser };
