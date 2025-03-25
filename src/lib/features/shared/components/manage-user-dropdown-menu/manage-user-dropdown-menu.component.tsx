import { Button } from '$lib/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '$lib/components/ui/dropdown-menu';
import { useData } from '$lib/contexts/data';
import type { TUser } from '$lib/types';

import { BookMinus, BookPlus, ExternalLink, UserRoundMinus, UserRoundPlus } from 'lucide-react';

type TManageUserDropdownMenuProps = React.ComponentProps<typeof DropdownMenu> & {
	triggerProps?: React.ComponentProps<typeof Button>;
	user: TUser;
};

/**
 * Dropdown menu for managing a user.
 *
 * @returns The rendered dropdown menu.
 */
export function ManageUserDropdownMenu({ children, user, ...props }: TManageUserDropdownMenuProps) {
	const { data, addToWhitelist, removeFromWhitelist, follow, unfollow } = useData();

	return (
		<DropdownMenu {...props}>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-48'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem aria-label='View profile' asChild>
					<a href={user.html_url} target='_blank' rel='noopener noreferrer'>
						<ExternalLink />
						<span className='select-none'>View profile</span>
					</a>
				</DropdownMenuItem>
				{data.whitelist.includes(user.id) ? (
					<DropdownMenuItem
						variant='destructive'
						aria-label='Remove from whitelist'
						onClick={() => removeFromWhitelist(user.id)}
					>
						<BookMinus />
						<span className='select-none'>Remove from whitelist</span>
					</DropdownMenuItem>
				) : (
					<DropdownMenuItem
						aria-label='Add to whitelist'
						title='Add to whitelist'
						onClick={() => addToWhitelist(user.id)}
					>
						<BookPlus />
						<span className='select-none'>Add to whitelist</span>
					</DropdownMenuItem>
				)}
				{user.followedBy ? (
					<DropdownMenuItem
						variant='destructive'
						aria-label='Unfollow'
						onClick={() => unfollow(user.login)}
					>
						<UserRoundMinus />
						<span className='select-none'>Unfollow</span>
					</DropdownMenuItem>
				) : (
					<DropdownMenuItem
						variant='default'
						aria-label='Follow'
						onClick={() => follow(user.login)}
					>
						<UserRoundPlus />
						<span className='select-none'>Follow</span>
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
