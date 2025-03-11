import { LogoText } from '$lib/components/icons/logo-text';
import { ModeToggle } from '$lib/components/theme';
import Link from 'next/link';

export function Header() {
	return (
		<header className='sticky top-0 z-50 flex flex-col'>
			<div className='border-border bg-background z-10 border-b'>
				<div className='container mx-auto flex h-[52px] max-w-3xl flex-col px-2 py-2 md:px-4 lg:px-0'>
					<div className='flex items-center justify-between gap-4 sm:justify-start md:justify-between'>
						<div className='flex'>
							<Link href='/' className='contents'>
								<LogoText />
							</Link>
						</div>

						<div className='flex'>
							<ModeToggle />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
