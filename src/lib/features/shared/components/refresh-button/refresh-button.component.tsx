import { Button } from '$lib/components/ui/button';

import { RotateCw } from 'lucide-react';

type TRefreshButtonProps = React.ComponentProps<typeof Button>;

/**
 * The `RefreshButton` component renders a button to refresh data.
 *
 * @returns The rendered refresh button component.
 */
export function RefreshButton(props: TRefreshButtonProps) {
	return (
		<Button size='icon' variant='ghost' aria-label='Refresh' title='Refresh' {...props}>
			<RotateCw />
			<span className='sr-only select-none'>Refresh</span>
		</Button>
	);
}
