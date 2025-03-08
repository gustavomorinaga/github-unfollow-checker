import type { JSX } from 'react';

export default function Footer(): JSX.Element {
	return (
		<footer className='absolute right-0 bottom-0 left-0 my-4 flex h-auto flex-col items-center justify-center text-center'>
			<address>
				Developed with 💗 by&nbsp;
				<a
					href='https://github.com/gmatthewsfeuer'
					target='_blank'
					rel='author noopener noreferrer'
					className='no-underline transition-colors ease-in-out hover:text-indigo-500 hover:underline'
				>
					<strong>Gustavo Matheus</strong>
				</a>
			</address>

			<a className='max-w-max' href='http://vercel.com' target='_blank' rel='noopener noreferrer'>
				<picture className='relative block h-8 w-28'>
					<img
						src='/assets/svgs/powered-by-vercel.svg'
						alt='Powered By Vercel'
						width={212}
						height={44}
					/>
				</picture>
			</a>
		</footer>
	);
}
