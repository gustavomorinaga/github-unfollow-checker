import React from 'react';

import {
	Eye,
	// MonitorDown,
	Moon,
	Search,
	Shield,
	Smartphone,
	UserRoundCheck,
	UserRoundPlus,
	Users
} from 'lucide-react';

type TFeature = {
	icon: React.ElementType;
	title: string;
	description: string;
};

const features: Array<TFeature> = [
	{
		icon: Eye,
		title: 'Unfollowers',
		description: 'Check the users that don’t follow you back.'
	},
	{
		icon: Users,
		title: 'Not Mutuals',
		description: 'Find users that you don’t follow back.'
	},
	{
		icon: UserRoundPlus,
		title: 'Followers',
		description: 'View the users that follow you.'
	},
	{
		icon: UserRoundCheck,
		title: 'Following',
		description: 'See the users that you are following.'
	},
	{
		icon: Shield,
		title: 'Whitelist',
		description: 'Add users to a whitelist to avoid unfollowing them.'
	},
	{
		icon: Search,
		title: 'Search Users',
		description: 'Easily search for users by their username.'
	},
	{
		icon: Moon,
		title: 'Dark Mode',
		description: 'Toggle between light and dark mode for a better experience.'
	},
	{
		icon: Smartphone,
		title: 'Responsive Design',
		description: 'Enjoy a seamless experience on all devices.'
	}
	// {
	// 	icon: MonitorDown,
	// 	title: 'Progressive Web App',
	// 	description: 'Install the application on your device for quick access.'
	// }
];

/**
 * The `Features` component renders a section with the features of the application.
 *
 * @returns The rendered section with the features of the application.
 */
export function Features() {
	return (
		<div className='flex min-h-screen items-center justify-center py-12'>
			<div className='flex flex-col px-4 md:px-0'>
				<h2 className='sm:text-5x text-center text-4xl font-bold tracking-tight text-balance'>
					Optimize your GitHub network
				</h2>

				<div className='mx-auto mt-10 grid max-w-screen-md gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3'>
					{features.map((feature) => (
						<div key={feature.title} className='flex flex-col rounded-xl border px-5 py-6'>
							<div className='bg-muted mb-3 flex size-10 items-center justify-center rounded-full'>
								<feature.icon className='size-6' />
							</div>
							<span className='text-lg font-semibold text-balance'>{feature.title}</span>
							<p className='text-foreground/80 mt-1 text-sm text-balance'>{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
