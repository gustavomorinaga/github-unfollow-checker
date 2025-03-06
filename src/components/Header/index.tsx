import type { JSX } from 'react';

// --- Components ---
import Account from '@components/Account';

export default function Header({ account }): JSX.Element {
	return (
		<header className="w-full px-4 flex items-center justify-between gap-4">
			<h1 className="md:text-3xl text-lg font-sans font-extrabold text-gray-100">
				GitHub Unfollow Checker
			</h1>
			<Account account={account} />
		</header>
	);
}
