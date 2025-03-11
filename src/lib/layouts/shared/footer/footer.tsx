import { siteMetadata } from '$lib/configs/site';
import { cn } from '$lib/utils/ui';

export function Footer({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
	return (
		<footer className={cn('bg-muted border-t p-4', className)} {...props}>
			<aside className='text-muted-foreground container mx-auto max-w-3xl text-center text-xs text-balance md:text-sm'>
				<p>
					{siteMetadata.applicationName} is not affiliated with or endorsed by GitHub. All content
					posted here is public and owned by its respective authors.
				</p>

				<p>
					© {new Date().getFullYear()} {siteMetadata.applicationName}. All rights reserved.
				</p>
			</aside>
		</footer>
	);
}
