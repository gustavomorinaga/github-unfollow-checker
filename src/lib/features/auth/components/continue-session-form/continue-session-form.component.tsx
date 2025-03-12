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
import { siteMetadata } from '$lib/configs/site';
import { Avatar } from '$lib/features/auth/components/avatar';
import { LegalAgreement } from '$lib/features/auth/components/legal-agreement';
import { cn } from '$lib/utils/ui';
import Link from 'next/link';

/**
 * The `ContinueSessionForm` component renders a form to continue the session if a valid session exists.
 *
 * @param props - The props for the component.
 * @param props.className - Additional class names to apply to the component.
 *
 * @returns The rendered component or null if no session exists.
 */
export async function ContinueSessionForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
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
					<Link href='/' className='contents'>
						<ShimmerButton background={siteMetadata.other['theme-color']} className='w-full'>
							<Avatar className='mr-3 size-6 shrink-0 ring ring-white' />
							<span className='truncate select-none'>
								Continue as <strong>@{session.user.login}</strong>
							</span>
						</ShimmerButton>
					</Link>
				</CardContent>
				<CardFooter>
					<LegalAgreement className='text-muted-foreground text-center text-balance' />
				</CardFooter>
			</Card>
		</div>
	);
}
