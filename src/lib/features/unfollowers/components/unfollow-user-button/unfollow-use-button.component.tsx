import { Button } from '$lib/components/ui/button';
import { useData } from '$lib/contexts/data';
import type { TUser } from '$lib/types';

import { UserRoundX } from 'lucide-react';

type TUnfollowUserButtonProps = React.ComponentProps<typeof Button> & {
	/**
	 * The user object to be unfollowed.
	 */
	user: TUser;
};

/**
 * A button component that unfollows a user.
 *
 * @returns The rendered button component.
 */
export function UnfollowUserButton({ user, ...props }: TUnfollowUserButtonProps) {
	const { unfollow } = useData();

	return (
		<Button
			size='icon'
			variant='destructive'
			aria-label='Unfollow'
			onClick={() => unfollow(user.login)}
			{...props}
		>
			<UserRoundX />
			<span className='sr-only select-none'>Unfollow</span>
		</Button>
	);
}
