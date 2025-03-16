import Link from 'next/link';

import { LogoText } from '$lib/components/icons/logo-text';
import { Button } from '$lib/components/ui/button';
import { repoMetadata, siteMetadata } from '$lib/configs/site';
import { cn } from '$lib/utils/ui';

type TFooterProps = React.ComponentProps<'footer'>;

/**
 * The `Footer` component renders a footer element with specified class names and additional props.
 *
 * @returns The rendered footer element with the specified content and props.
 */
export function Footer({ className, ...props }: TFooterProps) {
	const {
		owner: { email }
	} = repoMetadata;

	return (
		<footer className={cn('bg-muted border-t p-4', className)} {...props}>
			<aside className='container mx-auto flex max-w-3xl flex-col gap-2 text-center text-xs text-balance md:text-sm'>
				<Link href='/' className='contents'>
					<LogoText className='w-fit self-center' />
				</Link>

				<p className='text-muted-foreground'>
					{siteMetadata.applicationName} is not affiliated with or endorsed by GitHub. All content
					posted here is public and owned by its respective authors.
				</p>

				<div className='text-muted-foreground flex items-center justify-center gap-2 [&>a]:px-1 [&>div]:select-none'>
					<Button variant='link' asChild>
						<Link href='/'>Home</Link>
					</Button>
					<div>|</div>
					<Button variant='link' asChild>
						<Link href='/legal/terms'>Terms of Use</Link>
					</Button>
					<div>|</div>
					<Button variant='link' asChild>
						<Link href='/legal/privacy-policy'>Privacy Policy</Link>
					</Button>
					<div>|</div>
					<Button variant='link' asChild>
						<a href={`mailto:${email}`}>Contact</a>
					</Button>
				</div>

				<p className='text-muted-foreground'>
					© {new Date().getFullYear()} {siteMetadata.applicationName}. All rights reserved.
				</p>
			</aside>
		</footer>
	);
}
