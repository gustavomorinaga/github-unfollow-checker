import { cn } from '$lib/utils/ui';

/**
 * The `Content` component renders a main HTML element with specified class names and additional props.
 *
 * @param props - The props object.
 * @param props.className - Additional class names to apply to the main element.
 * @param props.children - The content to be rendered inside the main element.
 *
 * @returns The rendered main element with the specified content and props.
 */
export function Content({ className, children, ...props }: React.ComponentProps<'main'>) {
	return (
		<main
			className={cn('container mx-auto flex size-full max-w-3xl flex-1 flex-col', className)}
			{...props}
		>
			{children}
		</main>
	);
}
