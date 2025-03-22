import Link from 'next/link';

import { auth } from '$lib/auth';
import { ShimmerButton } from '$lib/components/magicui/shimmer-button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '$lib/components/ui/card';
import { Avatar } from '$lib/features/auth/components/avatar';
import { LegalAgreement } from '$lib/features/auth/components/legal-agreement';
import { cn } from '$lib/utils/ui';

type TContinueSessionFormProps = React.ComponentPropsWithoutRef<'div'>;

/**
 * The `ContinueSessionForm` component renders a form to continue the session if a valid session exists.
 *
 * @returns The rendered component or null if no session exists.
 */
export async function ContinueSessionForm({ className, ...props }: TContinueSessionFormProps) {
	const session = await auth();

	if (!session) return null;

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className='text-center'>
					<CardTitle className='text-xl'>Welcome back</CardTitle>
					<CardDescription className='text-balance'>
						Continue with your GitHub account to access the full experience.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ShimmerButton
						aria-label={`Continue as @${session.user.login}`}
						background='var(--primary)'
						asChild
						className='w-full'
					>
						<Link href='/'>
							<Avatar className='mr-3 size-6 shrink-0 ring ring-white' />
							<span className='truncate select-none'>
								Continue as <strong>{`@${session.user.login}`}</strong>
							</span>
						</Link>
					</ShimmerButton>
				</CardContent>
				<CardFooter>
					<LegalAgreement className='text-muted-foreground text-center text-balance' />
				</CardFooter>
			</Card>
		</div>
	);
}
