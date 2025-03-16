import Link from 'next/link';

import { auth, handleSignIn, handleSignOut } from '$lib/auth';
import { Button } from '$lib/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '$lib/components/ui/dropdown-menu';
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
export async function Account() {
	const session = await auth();

	if (!session)
		return (
			<Button size='sm' aria-label='Login' onClick={handleSignIn}>
				<span className='select-none'>Login</span>
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
					<a
						href={`https://github.com/${session.user.login}`}
						target='_blank'
						rel='noopener noreferrer'
						className='group contents'
					>
						<div className='flex gap-2'>
							<div className='flex'>
								<Avatar className='group-hover:ring-primary size-10 transition-[color,box-shadow] group-hover:ring-2' />
							</div>

							<div className='flex flex-col'>
								<span className='line-clamp-1 text-sm font-medium'>{session.user.name}</span>
								<div className='flex items-center gap-2'>
									<span className='text-muted-foreground group-hover:text-primary line-clamp-1 text-xs underline-offset-2 transition-colors group-hover:underline'>
										@{session.user.login}
									</span>
								</div>
							</div>
						</div>
					</a>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/dashboard'>
						<Boxes />
						<span className='select-none'>Dashboard</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/'>
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
