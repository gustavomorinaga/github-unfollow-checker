import { Button } from '$lib/components/ui/button';
import type { TUser } from '$lib/types';

import { ExternalLink } from 'lucide-react';

type TViewUserProfileButtonProps = React.ComponentProps<typeof Button> & {
	/**
	 * The user to view the profile of.
	 */
	user: TUser;
};

/**
 * A button component that opens the user's profile in a new tab.
 *
 * @returns The rendered button component.
 */
export function ViewUserProfileButton({ user, ...props }: TViewUserProfileButtonProps) {
	return (
		<Button
			size='icon'
			variant='outline'
			aria-label='View profile'
			title='View profile'
			asChild
			{...props}
		>
			<a href={user.html_url} target='_blank' rel='noopener noreferrer'>
				<ExternalLink />
				<span className='sr-only select-none'>View profile</span>
			</a>
		</Button>
	);
}
