import { useState, type JSX } from 'react';
import { signOut } from 'next-auth/react';
import { FaAt, FaDoorClosed, FaDoorOpen } from 'react-icons/fa';

export default function Account({ account }): JSX.Element {
	const [isHover, setIsHover] = useState(false);

	const handleSignOutIcon = (value: boolean) => setIsHover(value);

	return (
		<div className='flex items-center gap-2 py-4'>
			<a
				title='View Your Profile'
				href={account.html_url}
				target='_blank'
				rel='noopener noreferrer'
				className='flex max-w-max items-center gap-1 font-sans text-gray-400 no-underline hover:underline'
			>
				<picture className='pointer-events-none relative block h-10 w-10 overflow-hidden rounded-full border-2 border-gray-100 md:h-12 md:w-12'>
					<img
						src={account.image}
						alt={`${account.image} Profile Image`}
						width={100}
						height={100}
						loading='lazy'
					/>
				</picture>
			</a>

			<div className='hidden lg:flex lg:flex-col'>
				{account.name && <span className='font-sans text-white'>{account.name}</span>}
				<a
					href={account.html_url}
					target='_blank'
					rel='noopener noreferrer'
					className='flex max-w-max items-center gap-1 font-sans text-gray-400 no-underline hover:underline'
				>
					<FaAt />
					{account.login}
				</a>
			</div>
			<button
				title='Sign Out'
				aria-label='Sign Out'
				className='flex cursor-pointer items-center justify-center rounded-2xl border-2 border-transparent bg-transparent p-2 text-2xl text-red-500 transition-colors ease-in-out hover:border-red-700 hover:bg-red-900 hover:text-red-300'
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
