import { useState, type JSX } from 'react';
import { signOut } from 'next-auth/react';
import { FaAt, FaDoorClosed, FaDoorOpen } from 'react-icons/fa';

export default function Account({ account }): JSX.Element {
	const [isHover, setIsHover] = useState(false);

	const handleSignOutIcon = (value: boolean) => setIsHover(value);

	return (
		<div className="flex items-center gap-2 py-4">
			<a
				title="View Your Profile"
				href={account.html_url}
				target="_blank"
				rel="noopener noreferrer"
				className="max-w-max flex items-center gap-1 font-sans text-gray-400 no-underline hover:underline"
			>
				<picture className="relative block md:w-12 w-10 md:h-12 h-10 overflow-hidden pointer-events-none border-2 border-gray-100 rounded-full">
					<img
						src={account.image}
						alt={`${account.image} Profile Image`}
						width={100}
						height={100}
						loading="lazy"
					/>
				</picture>
			</a>

			<div className="lg:flex lg:flex-col hidden">
				{account.name && <span className="text-white font-sans">{account.name}</span>}
				<a
					href={account.html_url}
					target="_blank"
					rel="noopener noreferrer"
					className="max-w-max flex items-center gap-1 font-sans text-gray-400 no-underline hover:underline"
				>
					<FaAt />
					{account.login}
				</a>
			</div>
			<button
				title="Sign Out"
				aria-label="Sign Out"
				className="flex items-center justify-center p-2 cursor-pointer bg-transparent hover:bg-red-900 rounded-2xl text-2xl text-red-500 hover:text-red-300 border-2 border-transparent hover:border-red-700 transition-colors ease-in-out"
				onClick={() => signOut()}
				onMouseOver={() => handleSignOutIcon(true)}
				onMouseLeave={() => handleSignOutIcon(false)}
				onFocus={() => handleSignOutIcon(true)}
			>
				{isHover ? <FaDoorOpen /> : <FaDoorClosed />}
			</button>
		</div>
	);
}
