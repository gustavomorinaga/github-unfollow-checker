import { cn } from '$lib/utils/ui';

type TContentProps = React.ComponentProps<'main'>;

/**
 * The `Content` component renders a main HTML element with specified class names and additional props.
 *
 * @returns The rendered main element with the specified content and props.
 */
export function Content({ className, children, ...props }: TContentProps) {
	return (
		<main className={cn('container mx-auto flex size-full flex-1 flex-col', className)} {...props}>
			{children}
		</main>
	);
}
