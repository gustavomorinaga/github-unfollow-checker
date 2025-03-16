'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
import { Badge } from '$lib/components/ui/badge';
import { Button } from '$lib/components/ui/button';
import { Checkbox } from '$lib/components/ui/checkbox';
import { ManageUserDropdownMenu } from '$lib/features/shared/components/manage-user-dropdown-menu';
import type { TUser } from '$lib/types';

import { UserRoundCheck, UserRoundX } from 'lucide-react';

/**
 * Defines the base columns map for the User Table.
 */
const baseColumnsMap = {
	select: {
		id: 'select',
		enableSorting: false,
		enableHiding: false,
		header: ({ table }) => (
			<div className='flex w-8 items-center justify-center'>
				<Checkbox
					aria-label='Select all'
					title='Select all'
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					disabled={table.getRowCount() === 0}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					className='hover:border-primary/60 transition-colors disabled:pointer-events-none'
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className='flex w-8 items-center justify-center'>
				<Checkbox
					aria-label='Select user'
					title='Select user'
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					className='hover:border-primary/60 transition-colors'
				/>
			</div>
		)
	},
	login: {
		accessorKey: 'login',
		header: () => <span>Username</span>,
		cell: ({ row }) => {
			const { avatar_url: image, login: username, html_url: profileURL } = row.original;

			return (
				<div className='flex items-center gap-2'>
					<Button
						variant='link'
						aria-label={`@${username}`}
						asChild
						className='group w-32 flex-1 justify-start p-0 md:w-full md:min-w-64'
					>
						<a href={profileURL} target='_blank' rel='noopener noreferrer'>
							<Avatar className='group-hover:ring-primary ring-border ring transition-shadow'>
								<AvatarImage src={image} alt={`${username} avatar`} loading='lazy' />
								<AvatarFallback className='uppercase'>{username.at(0)}</AvatarFallback>
							</Avatar>

							<span className='truncate select-none'>{`@${username}`}</span>
						</a>
					</Button>
				</div>
			);
		}
	},
	type: {
		accessorKey: 'type',
		header: () => <span className='sr-only'>Type</span>,
		cell: ({ row }) => {
			const { type } = row.original;

			return (
				<div className='flex w-16 justify-end'>
					<Badge variant='secondary' className='border-muted-foreground/50 border select-none'>
						{type}
					</Badge>
				</div>
			);
		}
	},
	followed: {
		accessorKey: 'followedBy',
		header: () => <span className='sr-only'>Following status</span>,
		cell: ({ row }) => {
			const followedBy = row.getValue<TUser['followedBy']>('followedBy');
			return (
				<div className='[&>svg]:text-muted-foreground flex w-full max-w-5 items-center gap-2 select-none md:max-w-16 [&>span]:sr-only [&>span]:shrink-0 md:[&>span]:not-sr-only'>
					{followedBy ? (
						<>
							<UserRoundCheck className='size-5 shrink-0' />
							<span>Following</span>
						</>
					) : (
						<>
							<UserRoundX className='size-5 shrink-0' />
							<span>Not Following</span>
						</>
					)}
				</div>
			);
		}
	},
	actions: {
		id: 'actions',
		header: () => <span>Actions</span>,
		cell: ({ row: { original: user } }) => (
			<div className='flex w-full items-center justify-end'>
				<ManageUserDropdownMenu user={user} />
			</div>
		)
	}
} as const satisfies Record<string, ColumnDef<TUser>>;

/**
 * Defines the base columns for the User Table.
 */
const baseColumns = Object.values(baseColumnsMap);

export { baseColumns, baseColumnsMap, type TUser };
