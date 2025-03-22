import { Logo } from '$lib/components/icons/logo';
import { siteMetadata } from '$lib/configs/site';
import { cn } from '$lib/utils/ui';

type TLogoTextProps = React.ComponentProps<'div'>;

/**
 * Renders a logo with accompanying text.
 *
 * @returns The rendered logo text component.
 */
export function LogoText({ className, ...props }: TLogoTextProps) {
	return (
		<div className={cn('flex items-center gap-2 font-medium', className)} {...props}>
			<Logo className='size-6' />
			<span className='text-primary select-none'>{siteMetadata.applicationName}</span>
		</div>
	);
}
