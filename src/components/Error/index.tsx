import type { JSX } from 'react';

export default function Error(): JSX.Element {
	return (
		<span className='rounded-2xl border-2 border-red-300 bg-red-500 p-4 font-sans text-2xl font-normal text-red-100'>
			Error occurred! Sorry... 😢
		</span>
	);
}
