import Link from 'next/link';

import { auth } from '$lib/auth';
import { LogoText } from '$lib/components/icons/logo-text';
import { FlickeringGrid } from '$lib/components/magicui/flickering-grid';
import { ContinueSessionForm } from '$lib/features/auth/components/continue-session-form';
import { LoginForm } from '$lib/features/auth/components/login-form';

/**
 * The `LoginView` component is an asynchronous function that renders the login view for the application.
 * It checks for an existing authentication session and conditionally renders either the `ContinueSessionForm`
 * or the `LoginForm` based on the session status.
 *
 * @returns A promise that resolves to a JSX element representing the login view.
 *
 * The component structure includes:
 * - A `FlickeringGrid` component for visual effects in the background.
 * - A `Link` component wrapping the `LogoText` component, which serves as a navigational link to the home page.
 * - A conditional rendering of either `ContinueSessionForm` or `LoginForm` based on the presence of an authentication session.
 */
export async function LoginView() {
	const session = await auth();

	return (
		<div className='relative flex size-full flex-1 flex-col items-center justify-center gap-6 overflow-hidden p-6 md:p-10'>
			<FlickeringGrid
				squareSize={16}
				gridGap={6}
				color='#3730a3'
				maxOpacity={0.5}
				flickerChance={0.1}
				width={800}
				height={800}
				className='absolute inset-0 z-0 grid size-full place-items-center [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]'
			/>

			<div className='z-10 flex w-full max-w-sm flex-col gap-6'>
				<Link href='/' className='contents'>
					<LogoText className='bg-card text-card-foreground self-center rounded-xl border px-4 py-2 shadow-sm' />
				</Link>

				{session ? <ContinueSessionForm /> : <LoginForm />}
			</div>
		</div>
	);
}
