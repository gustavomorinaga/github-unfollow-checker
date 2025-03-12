import { auth } from '$lib/auth';
import { AvatarFallback, AvatarImage, Avatar as AvatarRoot } from '$lib/components/ui/avatar';
import { cn } from '$lib/utils/ui';

/**
 * The `Avatar` component displays the user's avatar image.
 *
 * @param props - The component props.
 * @param props.className - Additional class names for styling the AvatarRoot component.
 *
 * @returns The Avatar component or null if no user session is found.
 */
export async function Avatar({ className }: React.ComponentProps<typeof AvatarRoot>) {
	const session = await auth();

	if (!session || !session.user) return null;

	return (
		<AvatarRoot className={cn(className)}>
			<AvatarImage src={session.user.image} alt={`${session.user.login} avatar`} />
			<AvatarFallback className='uppercase'>{session.user.login.at(0)}</AvatarFallback>
		</AvatarRoot>
	);
}
