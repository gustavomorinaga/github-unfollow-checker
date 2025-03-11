import { LogoText } from '$lib/components/icons/logo-text';
import { FlickeringGrid } from '$lib/components/magicui/flickering-grid';
import { LoginForm } from '$lib/features/auth/components/login-form';
import Link from 'next/link';

export default function LoginPage() {
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

				<LoginForm />
			</div>
		</div>
	);
}
