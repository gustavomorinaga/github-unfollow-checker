'use client';

import React from 'react';

import Link from 'next/link';

import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

import { Button } from '$lib/components/ui/button';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '$lib/components/ui/drawer';
import { AccountDetails } from '$lib/features/auth/components/account-details';

import { ArrowUpRight, Boxes, House, LogOut } from 'lucide-react';

type TDrawerMeuProps = React.ComponentProps<typeof Drawer> & {
	session: Session | null;
	contentProps?: React.ComponentProps<typeof DrawerContent>;
	closeOnSelectOption?: boolean;
};

/**
 * The `DrawerMenu` component renders a drawer menu with the specified content and props.
 *
 * @returns The rendered drawer menu component.
 */
export function DrawerMenu({
	children,
	session,
	contentProps,
	closeOnSelectOption = true,
	...props
}: TDrawerMeuProps) {
	const [open, setOpen] = React.useState<TDrawerMeuProps['open']>(false);

	function handleClose() {
		if (closeOnSelectOption) setOpen(false);
	}

	return (
		<Drawer {...props} open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent {...contentProps}>
				<div className='mx-auto w-full max-w-sm'>
					<DrawerHeader className='sr-only text-left'>
						<DrawerTitle>Menu</DrawerTitle>
						<DrawerDescription>Options to navigate through the application.</DrawerDescription>
					</DrawerHeader>

					<div className='flex flex-col gap-2 p-4'>
						{session ? (
							<>
								<div className='flex items-center justify-between rounded-md border p-2'>
									<div className='flex'>
										<AccountDetails session={session} />
									</div>
									<div className='flex'>
										<Button
											size='icon'
											variant='outline'
											aria-label='Sign Out'
											onClick={() => signOut({ redirectTo: '/home' })}
										>
											<LogOut />
											<span className='sr-only select-none'>Sign Out</span>
										</Button>
									</div>
								</div>

								<Button
									variant='outline'
									aria-label='Dashboard'
									onClick={handleClose}
									asChild
									className='w-full'
								>
									<Link href='/'>
										<Boxes />
										<span className='select-none'>Dashboard</span>
									</Link>
								</Button>
							</>
						) : (
							<Button size='sm' aria-label='Get Started' onClick={handleClose} asChild>
								<Link href='/login'>
									<ArrowUpRight />
									<span className='select-none'>Get Started</span>
								</Link>
							</Button>
						)}

						<Button
							variant='outline'
							aria-label='Home Page'
							onClick={handleClose}
							asChild
							className='w-full'
						>
							<Link href='/home'>
								<House />
								<span className='select-none'>Home Page</span>
							</Link>
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
