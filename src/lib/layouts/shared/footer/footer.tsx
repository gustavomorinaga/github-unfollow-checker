import { Button } from '$lib/components/ui/button';
import { repoMetadata, siteMetadata } from '$lib/configs/site';
import { cn } from '$lib/utils/ui';
import Link from 'next/link';

export function Footer({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
	return (
		<footer className={cn('bg-muted border-t p-4', className)} {...props}>
			<aside className='text-muted-foreground container mx-auto flex max-w-3xl flex-col gap-2 text-center text-xs text-balance md:text-sm'>
				<p>
					{siteMetadata.applicationName} is not affiliated with or endorsed by GitHub. All content
					posted here is public and owned by its respective authors.
				</p>

				<div className='flex items-center justify-center gap-2'>
					<Link href='/legal/privacy-policy' className='contents'>
						<Button variant='link' className='px-1'>
							Privacy Policy
						</Button>
					</Link>
					<div>|</div>
					<Link href='/legal/terms' className='contents'>
						<Button variant='link' className='px-1'>
							Terms of Use
						</Button>
					</Link>
					<div>|</div>
					<a href={`mailto:${repoMetadata.email}`} className='contents'>
						<Button variant='link' className='px-1'>
							Contact
						</Button>
					</a>
				</div>

				<p>
					© {new Date().getFullYear()} {siteMetadata.applicationName}. All rights reserved.
				</p>
			</aside>
		</footer>
	);
}
