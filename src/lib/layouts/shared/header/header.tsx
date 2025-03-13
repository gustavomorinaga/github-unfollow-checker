import Link from 'next/link';

import { LogoText } from '$lib/components/icons/logo-text';
import { ModeToggle } from '$lib/components/theme';
import { Account } from '$lib/features/auth/components/account';
import { GitHubRepo } from '$lib/features/social/github-repo';
import { cn } from '$lib/utils/ui';

/**
 * The `Header` component renders a header element with specified class names and additional props.
 *
 * @param props - The props object.
 * @param props.className - Additional class names to apply to the header element.
 *
 * @returns The rendered header element with the specified content and props.
 */
export function Header({ className, ...props }: React.ComponentProps<'header'>) {
	return (
		<header className={cn('sticky top-0 z-50 flex flex-col', className)} {...props}>
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
