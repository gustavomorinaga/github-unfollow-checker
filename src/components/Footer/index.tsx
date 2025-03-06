import type { JSX } from 'react';

export default function Footer(): JSX.Element {
	return (
		<footer className="absolute left-0 right-0 bottom-0 h-auto my-4 text-center flex flex-col justify-center items-center">
			<address>
				Developed with 💗 by&nbsp;
				<a
					href="https://github.com/gmatthewsfeuer"
					target="_blank"
					rel="author noopener noreferrer"
					className="no-underline hover:underline hover:text-indigo-500 transition-colors ease-in-out"
				>
					<strong>Gustavo Matheus</strong>
				</a>
			</address>

			<a
				className="max-w-max"
				href="http://vercel.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				<picture className="relative block w-28 h-8">
					<img
						src="/assets/svgs/powered-by-vercel.svg"
						alt="Powered By Vercel"
						width={212}
						height={44}
					/>
				</picture>
			</a>
		</footer>
	);
}
