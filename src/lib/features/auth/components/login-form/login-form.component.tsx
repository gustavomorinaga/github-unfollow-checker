import { handleSignIn } from '$lib/auth';
import { GitHub } from '$lib/components/icons/github';
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
import { LegalAgreement } from '$lib/features/auth/components/legal-agreement';
import { cn } from '$lib/utils/ui';

/**
 * The `LoginForm` component that renders a login form for GitHub authentication.
 *
 * @param props - The props for the component.
 * @param [props.className] - Additional class names to apply to the root div element.
 *
 * @returns The rendered login form component.
 */
export async function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className='text-center'>
					<CardTitle className='text-xl'>Welcome back</CardTitle>
					<CardDescription>
						Login with your GitHub account to access the full experience.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={handleSignIn} className='contents'>
						<ShimmerButton
							type='submit'
							background={siteMetadata.other['theme-color']}
							className='w-full'
						>
							<GitHub className='mr-3 size-5 shrink-0' />
							<span className='select-none'>Login with GitHub</span>
						</ShimmerButton>
					</form>
				</CardContent>
				<CardFooter>
					<LegalAgreement className='text-muted-foreground text-center text-balance' />
				</CardFooter>
			</Card>
		</div>
	);
}
