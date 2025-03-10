import { FlickeringGrid } from '$lib/components/magicui/flickering-grid';
import { LoginForm } from '$lib/features/auth/components/login-form';

export default function LoginPage() {
	return (
		<div className='bg-muted relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
			<FlickeringGrid
				squareSize={4}
				gridGap={6}
				color='#3730a3'
				maxOpacity={0.5}
				flickerChance={0.1}
				width={800}
				height={800}
				className='absolute inset-0 z-0 grid size-full place-items-center [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]'
			/>

			<div className='z-10 flex w-full max-w-sm flex-col gap-6'>
				<a
					href='/'
					className='bg-card text-card-foreground flex items-center gap-2 self-center rounded-xl border p-2 font-medium shadow-sm'
				>
					<div className='flex size-6 items-center justify-center rounded-md'>
						<img src='/assets/images/icon.svg' alt='GitHub Unfollow Checker' />
					</div>
					GitHub Unfollow Checker
				</a>

				<LoginForm />
			</div>
		</div>
	);
}
