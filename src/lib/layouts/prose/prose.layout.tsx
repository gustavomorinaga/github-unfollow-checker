import { cn } from '$lib/utils/ui';

/**
 * The `ProseLayout` component applies a set of predefined prose styles to its children.
 *
 * @param props - The props for the div element.
 * @param props.className - Additional class names to apply to the div element.
 * @param props.children - The content to be rendered inside the div element.
 *
 * @returns The rendered div element with applied prose styles.
 */
export function ProseLayout({ className, children, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'prose prose-headings:mt-8 prose-headings:font-semibold prose-li:text-muted-foreground prose-a:text-primary prose-p:text-muted-foreground prose-strong:text-accent-foreground prose-headings:text-foreground prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}
