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
import { LegalAgreement } from '$lib/features/auth/components/legal-agreement';
import { cn } from '$lib/utils/ui';

type TLoginFormProps = React.ComponentPropsWithoutRef<'div'>;

/**
 * The `LoginForm` component that renders a login form for GitHub authentication.
 *
 * @returns The rendered login form component.
 */
export async function LoginForm({ className, ...props }: TLoginFormProps) {
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
							name='github'
							type='submit'
							background='var(--primary)'
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
