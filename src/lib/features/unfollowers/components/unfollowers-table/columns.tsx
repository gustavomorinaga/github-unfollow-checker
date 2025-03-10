'use client';

import { Avatar, AvatarImage } from '$lib/components/ui/avatar';
import { Button } from '$lib/components/ui/button';
import { Checkbox } from '$lib/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';
import type { TUser } from '$lib/types';
import type { ColumnDef } from '@tanstack/react-table';
import { ExternalLink, UserRoundPlus, UserRoundX } from 'lucide-react';

const columns: Array<ColumnDef<TUser>> = [
	{
		id: 'select',
		size: 12,
		enableSorting: false,
		enableHiding: false,
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		)
	},
	{
		accessorKey: 'avatar_url',
		size: 16,
		header: 'Avatar',
		cell: ({ row }) => {
			const { avatar_url: image, login: username, html_url: profileURL } = row.original;

			return (
				<a href={profileURL} target='_blank' rel='noopener noreferrer' className='contents'>
					<Avatar>
						<AvatarImage src={image} alt={`${username} avatar`} loading='lazy' />
					</Avatar>
				</a>
			);
		}
	},
	{
		accessorKey: 'login',
		size: 0,
		header: 'Username',
		cell: ({ row }) => {
			const { login: username, html_url: profileURL } = row.original;

			return (
				<Button variant='link' aria-label={username} asChild className='w-full justify-start px-0'>
					<a href={profileURL} target='_blank' rel='noopener noreferrer'>
						<span className='select-none'>{username}</span>
					</a>
				</Button>
			);
		}
	},
	{
		id: 'actions',
		size: 52,
		header: 'Actions',
		cell: ({ row }) => {
			const { login: username, html_url: profileURL } = row.original;

			return (
				<div className='flex items-center justify-end gap-2'>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size='icon' variant='outline' aria-label='View profile' asChild>
								<a href={profileURL} target='_blank' rel='noopener noreferrer'>
									<ExternalLink />
									<span className='sr-only select-none'>View profile</span>
								</a>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>View profile</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size='icon'
								variant='outline'
								aria-label='Add to whitelist'
								onClick={() => console.log(`Add ${username} to whitelist`)}
							>
								<UserRoundPlus />
								<span className='sr-only select-none'>Add to whitelist</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Add to whitelist</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size='icon'
								variant='destructive'
								aria-label='Unfollow'
								onClick={() => console.log(`Unfollow ${username}`)}
							>
								<UserRoundX />
								<span className='sr-only select-none'>Unfollow</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Unfollow</p>
						</TooltipContent>
					</Tooltip>
				</div>
			);
		}
	}
];

export { columns, type TUser };
