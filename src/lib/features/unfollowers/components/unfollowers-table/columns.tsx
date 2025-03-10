'use client';

import { Avatar, AvatarImage } from '$lib/components/ui/avatar';
import { Button } from '$lib/components/ui/button';
import type { TUser } from '$lib/types';
import type { ColumnDef } from '@tanstack/react-table';

const columns: Array<ColumnDef<TUser>> = [
	{
		accessorKey: 'avatar_url',
		header: 'Avatar',
		cell: ({ row }) => {
			const image: TUser['avatar_url'] = row.getValue('avatar_url');
			const username: TUser['login'] = row.getValue('login');

			return (
				<Avatar>
					<AvatarImage src={image} alt={`${username} avatar`} loading='lazy' />
				</Avatar>
			);
		}
	},
	{
		accessorKey: 'login',
		header: 'Username',
		cell: ({ row }) => {
			const username: TUser['login'] = row.getValue('login');
			return <span>{username}</span>;
		}
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const username: TUser['login'] = row.getValue('login');
			return <Button onClick={() => console.log(`Unfollow ${username}`)}>Unfollow</Button>;
		}
	}
];

export { columns, type TUser };
