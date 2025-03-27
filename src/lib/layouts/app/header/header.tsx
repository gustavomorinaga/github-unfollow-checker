import React from 'react';

import Link from 'next/link';

import { auth, handleSignOut } from '$lib/auth';
import { LogoText } from '$lib/components/icons/logo-text';
import { ModeToggle } from '$lib/components/theme';
import { Button } from '$lib/components/ui/button';
import { AccountDropdownMenu } from '$lib/features/auth/components/account-dropdown-menu';
import { Avatar } from '$lib/features/auth/components/avatar';
import { GitHubRepoButton } from '$lib/features/social/components/github-repo-button';
import { cn } from '$lib/utils/ui';

import { Menu } from 'lucide-react';

import { DrawerMenu } from './drawer-menu';

type THeaderProps = React.ComponentProps<'header'>;

/**
 * The `Header` component renders a header element with specified class names and additional props.
 *
 * @returns The rendered header element with the specified content and props.
 */
export async function Header({ className, ...props }: THeaderProps) {
	const session = await auth();

	return (
		<header className={cn('sticky top-0 z-50 flex flex-col', className)} {...props}>
			<div className='border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 z-10 border-b backdrop-blur'>
				<div className='container mx-auto flex h-[52px] flex-col px-2 py-2 md:px-0'>
					<div className='flex flex-1 items-center justify-between gap-4 sm:justify-start md:justify-between'>
						<div className='flex gap-2'>
							<div className='contents md:hidden'>
								<DrawerMenu session={session} shouldScaleBackground>
									<Button size='icon' variant='ghost' aria-label='Menu'>
										<Menu />
										<span className='sr-only select-none'>Menu</span>
									</Button>
								</DrawerMenu>
							</div>
							<Link href='/home' className='contents'>
								<LogoText />
							</Link>
						</div>

						<div className='flex items-center gap-2'>
							<div className='hidden md:contents'>
								{session ? (
									<AccountDropdownMenu session={session} onSignOut={handleSignOut}>
										<Button
											size='icon'
											variant='ghost'
											aria-label='Account'
											className='data-[state="open"]:ring-primary overflow-hidden rounded-full ring ring-transparent'
										>
											<Avatar session={session} />
											<span className='sr-only select-none'>Account</span>
										</Button>
									</AccountDropdownMenu>
								) : (
									<Button
										size='sm'
										aria-label='Get Started'
										asChild
										className='hidden md:inline-flex'
									>
										<Link href='/login'>
											<span className='select-none'>Get Started</span>
										</Link>
									</Button>
								)}
							</div>

							<GitHubRepoButton />
							<ModeToggle />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
