import { LogoText } from '$lib/components/icons/logo-text';
import { ModeToggle } from '$lib/components/theme';
import { Account } from '$lib/features/auth/components/account';
import { GitHubRepo } from '$lib/features/social/github-repo';
import Link from 'next/link';

export function Header() {
	return (
		<header className='sticky top-0 z-50 flex flex-col'>
			<div className='border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 z-10 border-b backdrop-blur'>
				<div className='container mx-auto flex h-[52px] max-w-3xl flex-col px-2 py-2 md:px-4 lg:px-0'>
					<div className='flex items-center justify-between gap-4 sm:justify-start md:justify-between'>
						<div className='flex'>
							<Link href='/' className='contents'>
								<LogoText />
							</Link>
						</div>

						<div className='flex items-center gap-2'>
							<Account />
							<GitHubRepo />
							<ModeToggle />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
