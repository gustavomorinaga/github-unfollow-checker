import type { JSX } from 'react';

// --- Components ---
import Account from '@components/Account';

export default function Header({ account }): JSX.Element {
	return (
		<header className='flex w-full items-center justify-between gap-4 px-4'>
			<h1 className='font-sans text-lg font-extrabold text-gray-100 md:text-3xl'>
				GitHub Unfollow Checker
			</h1>
			<Account account={account} />
		</header>
	);
}
