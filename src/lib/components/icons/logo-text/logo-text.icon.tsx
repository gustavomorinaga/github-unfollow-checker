import { Logo } from '$lib/components/icons/logo';
import { siteMetadata } from '$lib/configs/site';
import { cn } from '$lib/utils/ui';

export function LogoText({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div className={cn('flex items-center gap-2 font-medium', className)} {...props}>
			<Logo className='size-6' />
			<span className='select-none'>{siteMetadata.applicationName}</span>
		</div>
	);
}
