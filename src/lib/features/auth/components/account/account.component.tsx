import { auth, signIn, signOut } from '$lib/auth';
import { Avatar, AvatarImage } from '$lib/components/ui/avatar';
import { Button } from '$lib/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '$lib/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';

export async function Account() {
	const session = await auth();

	const handleSignIn = async () => {
		'use server';
		return signIn('github', { redirectTo: '/' });
	};

	const handleSignOut = async () => {
		'use server';
		return signOut({ redirectTo: '/login' });
	};

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
					className='data-[state="open"]:ring-primary overflow-hidden rounded-full ring ring-transparent'
				>
					<Avatar>
						<AvatarImage src={session.user.image} alt={`${session.user.login} avatar`} />
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-72'>
				<DropdownMenuLabel className='font-normal'>
					<a
						href={`https://github.com/${session.user.login}`}
						target='_blank'
						rel='noopener noreferrer'
						className='group contents'
					>
						<div className='flex gap-2'>
							<div className='flex'>
								<Avatar className='group-hover:ring-primary size-10 group-hover:ring-2'>
									<AvatarImage src={session.user.image} alt={`${session.user.login} avatar`} />
								</Avatar>
							</div>

							<div className='flex flex-col'>
								<span className='line-clamp-1 text-sm font-medium'>{session.user.name}</span>
								<div className='flex items-center gap-2'>
									<span className='text-muted-foreground line-clamp-1 text-xs group-hover:underline'>
										@{session.user.login}
									</span>
								</div>
							</div>
						</div>
					</a>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem aria-label='Sign Out' onClick={handleSignOut}>
					<LogOut />
					<span className='select-none'>Sign Out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
