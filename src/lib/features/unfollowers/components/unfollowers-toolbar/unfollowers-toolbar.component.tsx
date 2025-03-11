'use client';

import React from 'react';
import { Button } from '$lib/components/ui/button';
import type { RowSelectionState } from '$lib/components/ui/data-table';
import { cn } from '$lib/utils/ui';

export type TUnfollowersToolbarProps = React.ComponentProps<'header'> & {
	rowSelection?: RowSelectionState;
};

/**
 * The `UnfollowersToolbar` component renders a toolbar for managing unfollowers.
 *
 * @param {TUnfollowersToolbarProps} props - The properties for the UnfollowersToolbar component.
 * @param {string} props.className - Additional class names to apply to the toolbar.
 * @param {Record<string, boolean>} props.rowSelection - An object representing the selected rows.
 *
 * @returns {JSX.Element} The rendered toolbar component.
 */
export function UnfollowersToolbar({ className, rowSelection }: TUnfollowersToolbarProps) {
	const hasSelectedRows = React.useMemo(() => {
		return rowSelection && Object.values(rowSelection).some(Boolean);
	}, [rowSelection]);

	return (
		<header className={cn('flex items-center justify-between', className)}>
			<div className='flex gap-2'>
				<Button size='sm' variant='outline' disabled={!hasSelectedRows}>
					Whitelist selected
				</Button>

				<Button size='sm' variant='destructive' disabled={!hasSelectedRows}>
					Unfollow selected
				</Button>
			</div>
		</header>
	);
}
