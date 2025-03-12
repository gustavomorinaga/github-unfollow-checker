import { LogoText } from '$lib/components/icons/logo-text';
import { Button } from '$lib/components/ui/button';
import { repoMetadata, siteMetadata } from '$lib/configs/site';
import { cn } from '$lib/utils/ui';
import Link from 'next/link';

/**
 * The `Footer` component renders a footer element with specified class names and additional props.
 *
 * @param props - The props object.
 * @param props.className - Additional class names to apply to the footer element.
 *
 * @returns The rendered footer element with the specified content and props.
 */
export function Footer({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
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

				<div className='text-muted-foreground flex items-center justify-center gap-2 [&>div]:select-none'>
					<Link href='/legal/terms' className='contents'>
						<Button variant='link' className='px-1'>
							Terms of Use
						</Button>
					</Link>
					<div>|</div>
					<Link href='/legal/privacy-policy' className='contents'>
						<Button variant='link' className='px-1'>
							Privacy Policy
						</Button>
					</Link>
					<div>|</div>
					<a href={`mailto:${email}`} className='contents'>
						<Button variant='link' className='px-1'>
							Contact
						</Button>
					</a>
				</div>

				<p className='text-muted-foreground'>
					© {new Date().getFullYear()} {siteMetadata.applicationName}. All rights reserved.
				</p>
			</aside>
		</footer>
	);
}
