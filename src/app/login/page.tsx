import { signIn } from '$lib/auth';
import { FaGithub } from 'react-icons/fa';

export default function LoginPage() {
	const handleSignIn = async () => {
		'use server';
		return signIn();
	};

	return (
		<div className='relative flex h-full w-full flex-col items-center justify-center gap-4 text-center'>
			<div className='-mt-32 flex h-full w-full flex-col items-center justify-center gap-4 px-4 text-center md:-mt-0'>
				<h1 className='my-0 font-sans text-4xl leading-tight font-extrabold text-gray-100 md:text-5xl'>
					GitHub Unfollow Checker
				</h1>

				<p className='my-0 font-sans text-lg text-gray-300'>
					A simple tool to check the users that doesn&apos;t follow you back 🧐
				</p>

				<form action={handleSignIn}>
					<button
						className='flex cursor-pointer items-center justify-center gap-2 rounded-3xl bg-green-300 px-6 py-4 font-sans text-xl text-gray-800 shadow-xl transition-colors ease-in-out hover:bg-green-400'
						aria-label='Sign In'
					>
						<FaGithub />
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
}
