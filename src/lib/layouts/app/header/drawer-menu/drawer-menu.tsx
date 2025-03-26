import Link from 'next/link';

import { auth, handleSignOut } from '$lib/auth';
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

import { Boxes, House, LogOut, Menu } from 'lucide-react';

export async function DrawerMenu() {
	const session = await auth();

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button size='icon' variant='ghost' aria-label='Menu'>
					<Menu />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className='sr-only mx-auto w-full max-w-sm'>
					<DrawerHeader className='text-left'>
						<DrawerTitle>Menu</DrawerTitle>
						<DrawerDescription>Options to navigate through the application.</DrawerDescription>
					</DrawerHeader>
				</div>
				<div className='flex flex-col gap-2 p-4'>
					{session && (
						<>
							<div className='flex items-center justify-between rounded-md border p-2'>
								<div className='flex'>
									<AccountDetails />
								</div>
								<div className='flex'>
									<Button
										size='icon'
										variant='outline'
										aria-label='Sign Out'
										onClick={handleSignOut}
									>
										<LogOut />
										<span className='sr-only select-none'>Sign Out</span>
									</Button>
								</div>
							</div>

							<Button variant='outline' aria-label='Dashboard' asChild className='w-full'>
								<Link href='/'>
									<Boxes />
									<span className='select-none'>Dashboard</span>
								</Link>
							</Button>
						</>
					)}

					<Button variant='outline' aria-label='Home Page' asChild className='w-full'>
						<Link href='/home'>
							<House />
							<span className='select-none'>Home Page</span>
						</Link>
					</Button>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
