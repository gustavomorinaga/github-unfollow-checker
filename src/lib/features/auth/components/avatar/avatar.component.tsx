import type { Session } from 'next-auth';

import { AvatarFallback, AvatarImage, Avatar as AvatarRoot } from '$lib/components/ui/avatar';

type TAvatarProps = React.ComponentProps<typeof AvatarRoot> & {
	session: Session;
};

/**
 * The `Avatar` component displays the user's avatar image.
 *
 * @returns The rendered avatar component.
 */
export function Avatar({ session, ...props }: TAvatarProps) {
	return (
		<AvatarRoot {...props}>
			<AvatarImage src={session.user.image} alt={`${session.user.login} avatar`} />
			<AvatarFallback className='uppercase'>{session.user.login.at(0)}</AvatarFallback>
		</AvatarRoot>
	);
}
