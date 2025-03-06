import type { JSX } from 'react';
import { signIn } from 'next-auth/react';

// --- Styles ---
import { FaGithub } from 'react-icons/fa';

export default function Welcome(): JSX.Element {
	return (
		<div className="relative w-full h-full flex flex-col items-center justify-center gap-4 text-center">
			<div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center md:-mt-0 -mt-32 px-4">
				<h1 className="my-0 md:text-5xl text-4xl font-extrabold font-sans leading-tight text-gray-100">
					GitHub Unfollow Checker
				</h1>
				<p className="my-0 text-gray-300 text-lg font-sans">
					A simple tool to check the users that doesn&apos;t follow you back 🧐
				</p>
				<button
					className="flex items-center justify-center gap-2 px-6 py-4 bg-green-300 hover:bg-green-400 shadow-xl cursor-pointer rounded-3xl font-sans text-xl text-gray-800 transition-colors ease-in-out"
					aria-label="Sign In"
					onClick={() => signIn('github')}
				>
					<FaGithub />
					Sign In
				</button>
			</div>
		</div>
	);
}
