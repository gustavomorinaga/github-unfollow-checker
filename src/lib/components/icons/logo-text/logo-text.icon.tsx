import { Logo } from '$lib/components/icons/logo';
import { siteMetadata } from '$lib/configs/site';
import { cn } from '$lib/utils/ui';

/**
 * Renders a logo with accompanying text.
 *
 * @param props - The properties passed to the component.
 * @param [props.className] - Additional class names to apply to the container div.
 * @returns The rendered logo text component.
 */
export function LogoText({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div className={cn('flex items-center gap-2 font-medium', className)} {...props}>
			<Logo className='size-6' />
			<span className='text-primary select-none'>{siteMetadata.applicationName}</span>
		</div>
	);
}
