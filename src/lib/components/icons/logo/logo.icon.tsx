import { cn } from '$lib/utils/ui';

type TLogoProps = React.ComponentProps<'svg'>;

/**
 * Renders the Logo component as an SVG element.
 *
 * @returns The rendered SVG element representing the logo.
 */
export function Logo({ className, ...props }: TLogoProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='288'
			height='288'
			viewBox='0 0 24 24'
			className={cn(className)}
			{...props}
		>
			<path
				fill='#f3f4f5'
				d='M8.9 21.6c2 .7 4.2.7 6.2 0a.5.5 0 0 1-.6-.5v-2.8c0-.6-.2-1.3-.7-1.8 2.3-.3 4.6-1.1 4.6-5 0-1-.4-1.9-1-2.6.3-.9.2-1.8-.1-2.7 0 0-.9-.3-2.8 1a9.4 9.4 0 0 0-5 0c-1.9-1.2-2.7-1-2.7-1-.4.9-.4 1.8-.1 2.7-.7.7-1 1.7-1 2.7 0 3.8 2.3 4.6 4.5 4.9-.4.3-.6.8-.6 1.3-1 .6-2.4.2-3-.8a2 2 0 0 0-1.5-1c-.8 0-.3.5 0 .6.5.4.8 1 1 1.5.3.5.9 1.6 3.4 1.1v1.9c0 .3-.2.5-.6.5z'
			/>
			<path
				fill='#3730a3'
				d='M12 2a10 10 0 0 0-3.1 19.6c.4 0 .6-.2.6-.5v-1.9c-2.5.5-3.2-.6-3.3-1.1l-1-1.5c-.4-.1-1-.6 0-.6a2 2 0 0 1 1.5 1c.5 1 1.8 1.4 2.9.8 0-.5.2-1 .6-1.3-2.2-.3-4.5-1.1-4.5-5 0-1 .3-1.9 1-2.6-.3-.9-.3-1.8 0-2.7 0 0 1-.2 2.8 1 1.7-.4 3.4-.4 5 0 2-1.3 2.8-1 2.8-1 .3.9.4 1.8 0 2.7.7.7 1.1 1.7 1.1 2.7 0 3.8-2.3 4.6-4.6 4.9.5.5.8 1.2.7 1.8v2.8a.5.5 0 0 0 .6.5A10 10 0 0 0 12 2z'
			/>
		</svg>
	);
}
