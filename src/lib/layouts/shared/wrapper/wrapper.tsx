import { cn } from '$lib/utils/ui';

type TWrapperProps = React.ComponentProps<'div'>;

/**
 * The `Wrapper` component provides a flexible container for its children.
 *
 * @returns A div element that wraps the children with the specified classes and props.
 */
export function Wrapper({ className, children, ...props }: TWrapperProps) {
	return (
		<div
			className={cn('bg-background flex size-full min-h-svh flex-1 flex-col', className)}
			{...props}
		>
			{children}
		</div>
	);
}
