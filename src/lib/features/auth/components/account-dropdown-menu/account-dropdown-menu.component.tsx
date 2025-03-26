import Link from 'next/link';

import { auth, handleSignOut } from '$lib/auth';
import { Button } from '$lib/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '$lib/components/ui/dropdown-menu';
import { AccountDetails } from '$lib/features/auth/components/account-details';
import { Avatar } from '$lib/features/auth/components/avatar';

import { Boxes, House, LogOut } from 'lucide-react';

/**
 * The `Account` component handles user authentication and displays the user's account information.
 *
 * If the user is not authenticated, it renders a login button.
 * If the user is authenticated, it renders a dropdown menu with the user's avatar and account details.
 *
 * @returns The rendered component.
 */
export async function AccountDropdownMenu() {
	const session = await auth();

	if (!session)
		return (
			<Button size='sm' aria-label='Get Started' asChild className='hidden md:inline-flex'>
				<Link href='/login'>
					<span className='select-none'>Get Started</span>
				</Link>
			</Button>
		);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size='icon'
					variant='ghost'
					aria-label='Account'
					className='data-[state="open"]:ring-primary overflow-hidden rounded-full ring ring-transparent'
				>
					<Avatar />
					<span className='sr-only select-none'>Account</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-64'>
				<DropdownMenuLabel className='font-normal'>
					<AccountDetails />
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
				<DropdownMenuItem aria-label='Sign Out' onClick={handleSignOut}>
					<LogOut />
					<span className='select-none'>Sign Out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
