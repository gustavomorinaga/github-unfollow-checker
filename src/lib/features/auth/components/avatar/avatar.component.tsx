import { auth } from '$lib/auth';
import { AvatarFallback, AvatarImage, Avatar as AvatarRoot } from '$lib/components/ui/avatar';
import { cn } from '$lib/utils/ui';

type TAvatarProps = React.ComponentProps<typeof AvatarRoot>;

/**
 * The `Avatar` component displays the user's avatar image.
 *
 * @returns The `Avatar` component or null if no user session is found.
 */
export async function Avatar({ className }: TAvatarProps) {
	const session = await auth();

	if (!session || !session.user) return null;

	return (
		<AvatarRoot className={cn(className)}>
			<AvatarImage src={session.user.image} alt={`${session.user.login} avatar`} />
			<AvatarFallback className='uppercase'>{session.user.login.at(0)}</AvatarFallback>
		</AvatarRoot>
	);
}
