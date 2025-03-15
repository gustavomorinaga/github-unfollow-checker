import { Button } from '$lib/components/ui/button';
import { useData } from '$lib/contexts/data';
import type { TUser } from '$lib/types';

import { UserRoundCheck } from 'lucide-react';

type TFollowUserButtonProps = React.ComponentProps<typeof Button> & {
	/**
	 * The user object to be unfollowed.
	 */
	user: TUser;
};

/**
 * A button component that follows a user.
 *
 * @returns The rendered button component.
 */
export function FollowUserButton({ user, ...props }: TFollowUserButtonProps) {
	const { follow } = useData();

	return (
		<Button size='icon' aria-label='Follow' onClick={() => follow(user.login)} {...props}>
			<UserRoundCheck />
			<span className='sr-only select-none'>Follow</span>
		</Button>
	);
}
