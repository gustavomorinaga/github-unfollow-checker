import type { JSX } from 'react';

export default function Error(): JSX.Element {
	return (
		<span className="p-4 bg-red-500 border-2 border-red-300 rounded-2xl text-2xl font-sans font-normal text-red-100">
			Error occurred! Sorry... 😢
		</span>
	);
}
