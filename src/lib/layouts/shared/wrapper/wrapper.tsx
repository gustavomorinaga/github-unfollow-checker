import { cn } from '$lib/utils/ui';

export function Wrapper({
	className,
	children,
	...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) {
	return (
		<div className={cn('flex size-full min-h-svh flex-1 flex-col', className)} {...props}>
			{children}
		</div>
	);
}
