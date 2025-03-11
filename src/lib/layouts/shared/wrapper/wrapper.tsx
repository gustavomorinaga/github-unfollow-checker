import { cn } from '$lib/utils/ui';

/**
 * The `Wrapper` component provides a flexible container for its children.
 *
 * @param className - Additional class names to apply to the wrapper.
 * @param children - The content to be wrapped.
 * @param props - Additional HTML attributes to apply to the wrapper.
 *
 * @returns A div element that wraps the children with the specified classes and props.
 */
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
