import { Button } from '$lib/components/ui/button';
import { useWhitelist } from '$lib/features/whitelist/hooks';
import type { TUser } from '$lib/types';

import { UserRoundMinus, UserRoundPlus } from 'lucide-react';

type TWhitelistToolbarProps = React.ComponentProps<typeof Button> & {
	user: TUser;
	action?: 'add' | 'remove';
};

type TActionButtonMap = Record<NonNullable<TWhitelistToolbarProps['action']>, React.ReactNode>;

/**
 * A button component that adds or removes a user from the whitelist.
 *
 * @returns The rendered button component.
 */
export function WhitelistUserButton({ user, action = 'add', ...props }: TWhitelistToolbarProps) {
	const { addToWhitelist, removeFromWhitelist } = useWhitelist();

	const actionButtonMap: TActionButtonMap = {
		add: (
			<Button
				size='icon'
				variant='outline'
				aria-label='Add to whitelist'
				onClick={() => addToWhitelist(user.id)}
				{...props}
			>
				<UserRoundPlus />
				<span className='sr-only select-none'>Add to whitelist</span>
			</Button>
		),
		remove: (
			<Button
				size='icon'
				variant='outline'
				aria-label='Remove from whitelist'
				onClick={() => removeFromWhitelist(user.id)}
				{...props}
			>
				<UserRoundMinus />
				<span className='sr-only select-none'>Remove from whitelist</span>
			</Button>
		)
	};

	return actionButtonMap[action];
}
