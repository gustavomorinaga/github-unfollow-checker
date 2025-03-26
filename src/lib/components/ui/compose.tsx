'use client';

export function Compose({
	children,
	components
}: React.PropsWithChildren<{ components: Array<React.ComponentType<React.PropsWithChildren>> }>) {
	return components.reduceRight((acc, Component) => <Component>{acc}</Component>, children);
}
