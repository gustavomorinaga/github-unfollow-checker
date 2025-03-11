import { cn } from '$lib/utils/ui';

export function Content({
	className,
	children,
	...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) {
	return (
		<main
			className={cn('container mx-auto flex size-full max-w-3xl flex-1 flex-col', className)}
			{...props}
		>
			{children}
		</main>
	);
}
