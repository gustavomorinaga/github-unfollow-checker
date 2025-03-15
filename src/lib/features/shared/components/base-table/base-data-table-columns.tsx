'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
import { Badge } from '$lib/components/ui/badge';
import { Button } from '$lib/components/ui/button';
import { Checkbox } from '$lib/components/ui/checkbox';
import type { TUser } from '$lib/types';

/**
 * Defines the base columns for the User Table.
 */
const baseColumns: Array<ColumnDef<TUser>> = [
	{
		id: 'select',
		enableSorting: false,
		enableHiding: false,
		size: 16,
		header: ({ table }) => (
			<div className='flex items-center justify-center'>
				<Checkbox
					aria-label='Select all'
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
			<div className='flex items-center justify-center'>
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label='Select row'
					className='hover:border-primary/60 transition-colors'
				/>
			</div>
		)
	},
	{
		accessorKey: 'login',
		header: () => <span>Username</span>,
		cell: ({ row }) => {
			const { avatar_url: image, login: username, html_url: profileURL } = row.original;

			return (
				<div className='group flex items-center gap-2'>
					<a
						href={profileURL}
						target='_blank'
						rel='noopener noreferrer'
						className='group-hover:[&>span]:outline-primary contents'
					>
						<Avatar className='outline-border outline transition-colors'>
							<AvatarImage src={image} alt={`${username} avatar`} loading='lazy' />
							<AvatarFallback className='uppercase'>{username.at(0)}</AvatarFallback>
						</Avatar>
					</a>

					<Button
						variant='link'
						aria-label={`@${username}`}
						asChild
						className='w-full justify-start px-0'
					>
						<a href={profileURL} target='_blank' rel='noopener noreferrer' className='contents'>
							<span className='truncate select-none'>@{username}</span>
						</a>
					</Button>
				</div>
			);
		}
	},
	{
		accessorKey: 'type',
		size: 36,
		header: () => <span>Type</span>,
		cell: ({ row }) => {
			const { type } = row.original;

			return (
				<div className='flex justify-end'>
					<Badge variant='secondary' className='border-muted-foreground/50 w- border select-none'>
						{type}
					</Badge>
				</div>
			);
		}
	}
];

export { baseColumns, type TUser };
