'use client';

import Link from 'next/link';

import type { Session } from 'next-auth';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '$lib/components/ui/dropdown-menu';
import { AccountDetails } from '$lib/features/auth/components/account-details';

import { Boxes, House, LogOut } from 'lucide-react';

type TAccountDropdownMenuProps = React.ComponentProps<typeof DropdownMenu> & {
	session: Session;
	contentProps?: React.ComponentProps<typeof DropdownMenuContent>;
	onSignOut?: () => void;
};

/**
 * The `AccountDropdownMenu` component renders a dropdown menu with account details and actions.
 *
 * @returns The rendered dropdown menu component.
 */
export function AccountDropdownMenu({
	children,
	session,
	contentProps,
	onSignOut,
	...props
}: TAccountDropdownMenuProps) {
	return (
		<DropdownMenu {...props}>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-64' {...contentProps}>
				<DropdownMenuLabel className='font-normal'>
					<AccountDetails session={session} />
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/'>
						<Boxes />
						<span className='select-none'>Dashboard</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/home'>
						<House />
						<span className='select-none'>Home Page</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem aria-label='Sign Out' onClick={onSignOut}>
					<LogOut />
					<span className='select-none'>Sign Out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
