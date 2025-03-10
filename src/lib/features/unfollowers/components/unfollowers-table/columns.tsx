'use client';

import { Avatar, AvatarImage } from '$lib/components/ui/avatar';
import { Button } from '$lib/components/ui/button';
import type { TUser } from '$lib/types';
import type { ColumnDef } from '@tanstack/react-table';
import { ExternalLink, UserRoundPlus, UserRoundX } from 'lucide-react';

const columns: Array<ColumnDef<TUser>> = [
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
		size: 36,
		header: 'Actions',
		cell: ({ row }) => {
			const { login: username, html_url: profileURL } = row.original;

			return (
				<div className='flex items-center justify-end gap-2'>
					<Button size='icon' variant='outline' aria-label='View profile' asChild>
						<a href={profileURL} target='_blank' rel='noopener noreferrer'>
							<ExternalLink />
							<span className='sr-only select-none'>View profile</span>
						</a>
					</Button>

					<Button
						size='icon'
						variant='outline'
						aria-label='Add to whitelist'
						onClick={() => console.log(`Add ${username} to whitelist`)}
					>
						<UserRoundPlus />
						<span className='sr-only select-none'>Add to whitelist</span>
					</Button>

					<Button
						size='icon'
						variant='destructive'
						aria-label='Unfollow'
						onClick={() => console.log(`Unfollow ${username}`)}
					>
						<UserRoundX />
						<span className='sr-only select-none'>Unfollow</span>
					</Button>
				</div>
			);
		}
	}
];

export { columns, type TUser };
