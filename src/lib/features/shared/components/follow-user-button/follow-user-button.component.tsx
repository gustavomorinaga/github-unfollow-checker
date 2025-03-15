import { Button } from '$lib/components/ui/button';
import { useData } from '$lib/contexts/data';
import type { TUser } from '$lib/types';

import { UserRoundCheck, UserRoundX } from 'lucide-react';

type TFollowUserButtonProps = React.ComponentProps<typeof Button> & { user: TUser };

type TActionButtonMap = Record<'follow' | 'unfollow', React.ReactNode>;

/**
 * A button component that follows or unfollows a user.
 *
 * @returns The rendered button component.
 */
export function FollowUserButton({ user, ...props }: TFollowUserButtonProps) {
	const { follow, unfollow } = useData();

	const action = user.followedBy ? 'unfollow' : 'follow';

	const actionButtonMap: TActionButtonMap = {
		follow: (
			<Button size='icon' aria-label='Follow' onClick={() => follow(user.login)} {...props}>
				<UserRoundCheck />
				<span className='sr-only select-none'>Follow</span>
			</Button>
		),
		unfollow: (
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
		)
	};

	return actionButtonMap[action];
}
