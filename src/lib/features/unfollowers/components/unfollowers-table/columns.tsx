'use client';

import { Avatar, AvatarImage } from '$lib/components/ui/avatar';
import { Badge } from '$lib/components/ui/badge';
import { Button } from '$lib/components/ui/button';
import { Checkbox } from '$lib/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';
import type { TUser } from '$lib/types';
import type { ColumnDef } from '@tanstack/react-table';
import { ExternalLink, UserRoundPlus, UserRoundX } from 'lucide-react';

const columns: Array<ColumnDef<TUser>> = [
	{
		id: 'select',
		size: 16,
		enableSorting: false,
		enableHiding: false,
		header: ({ table }) => (
			<div className='flex items-center justify-center'>
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label='Select all'
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className='flex items-center justify-center'>
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label='Select row'
				/>
			</div>
		)
	},
	{
		accessorKey: 'avatar_url',
		size: 20,
		header: () => <span>Avatar</span>,
		cell: ({ row }) => {
			const { avatar_url: image, login: username, html_url: profileURL } = row.original;

			return (
				<a
					href={profileURL}
					target='_blank'
					rel='noopener noreferrer'
					className='hover:[&>span]:outline-primary contents'
				>
					<Avatar className='outline transition-colors'>
						<AvatarImage src={image} alt={`${username} avatar`} loading='lazy' />
					</Avatar>
				</a>
			);
		}
	},
	{
		accessorKey: 'login',
		header: () => <span>Username</span>,
		cell: ({ row }) => {
			const { login: username, html_url: profileURL, type } = row.original;

			return (
				<div className='flex items-center gap-2'>
					<Badge variant='secondary' className='border-muted-foreground/50 border select-none'>
						{type}
					</Badge>

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
		id: 'actions',
		size: 44,
		header: () => <span>Actions</span>,
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
