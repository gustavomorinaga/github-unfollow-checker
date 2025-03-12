'use client';

import { Button } from '$lib/components/ui/button';
import type { RowSelectionState } from '$lib/components/ui/data-table';
import { cn } from '$lib/utils/ui';
import { RotateCw } from 'lucide-react';
import React from 'react';

export type TUnfollowersToolbarProps = React.ComponentProps<'header'> & {
	pending?: boolean;
	rowSelection?: RowSelectionState;
	onRefresh?: (formData: FormData) => void;
};

/**
 * The `UnfollowersToolbar` component renders a toolbar for managing unfollowers.
 *
 * @param props - The properties for the UnfollowersToolbar component.
 * @param props.className - Additional class names to apply to the toolbar.
 * @param props.rowSelection - An object representing the selected rows.
 *
 * @returns The rendered toolbar component.
 */
export function UnfollowersToolbar({
	className,
	pending = false,
	rowSelection,
	onRefresh
}: TUnfollowersToolbarProps) {
	const hasSelectedRows = React.useMemo(() => {
		return rowSelection && Object.values(rowSelection).some(Boolean);
	}, [rowSelection]);

	return (
		<header className={cn('flex flex-1 items-center justify-between', className)}>
			<div className='flex'>
				<form action={onRefresh} className='contents'>
					<Button type='submit' size='icon' variant='ghost' disabled={pending}>
						<RotateCw className={cn(pending && 'animate-spin')} />
					</Button>
				</form>
			</div>

			<div className='flex items-center gap-2'>
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
