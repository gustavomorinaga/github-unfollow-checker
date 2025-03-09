import { signIn } from '$lib/auth';
import { GitHub } from '$lib/components/icons/github';
import { Button } from '$lib/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
import { cn } from '$lib/utils/ui';

/**
 * A React component that renders a login form for GitHub authentication.
 *
 * @param props - The props for the component.
 * @param [props.className] - Additional class names to apply to the root div element.
 *
 * @returns The rendered login form component.
 *
 * @example
 * ```tsx
 * <LoginForm className="custom-class" />
 * ```
 */
export async function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const handleSignIn = async () => {
		'use server';
		return signIn('github', { redirectTo: '/' });
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className='text-center'>
					<CardTitle className='text-xl'>Welcome back</CardTitle>
					<CardDescription>Login with your GitHub account</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={handleSignIn}>
						<div className='grid gap-6'>
							<div className='flex flex-col gap-4'>
								<Button type='submit' className='w-full'>
									<GitHub className='size-5 shrink-0' />
									Login with GitHub
								</Button>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
			<div className='text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4'>
				By clicking continue, you agree to our <a href='#'>Terms of Service</a> and{' '}
				<a href='#'>Privacy Policy</a>.
			</div>
		</div>
	);
}
