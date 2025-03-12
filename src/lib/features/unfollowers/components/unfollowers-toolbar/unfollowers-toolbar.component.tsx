'use client';

import { Button } from '$lib/components/ui/button';
import { TUser } from '$lib/types';
import { cn } from '$lib/utils/ui';
import { RotateCw } from 'lucide-react';
import React from 'react';

export type TUnfollowersToolbarProps = React.ComponentProps<'header'> & {
	pending?: boolean;
	selectedRecords?: Array<TUser>;
	totalRecords?: number;
	onAddToWhitelist?: () => void;
	onRefresh?: () => void;
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
	selectedRecords,
	totalRecords,
	onAddToWhitelist,
	onRefresh
}: TUnfollowersToolbarProps) {
	const totalSelectedRows = React.useMemo(() => selectedRecords?.length || 0, [selectedRecords]);
	const hasSelectedRows = React.useMemo(() => totalSelectedRows > 0, [totalSelectedRows]);

	return (
		<header className={cn('flex flex-1 items-center justify-between', className)}>
			<div className='flex items-center gap-2'>
				<div className='text-muted-foreground sr-only flex min-w-20 items-center justify-end gap-1 text-sm md:not-sr-only [&_span]:tabular-nums'>
					{hasSelectedRows && (
						<>
							<span>{totalSelectedRows}</span>
							<div className='select-none'>/</div>
						</>
					)}
					<div className='contents'>
						<span>{totalRecords}</span>
						<p>{hasSelectedRows ? 'selected' : 'unfollowers'}</p>
					</div>
				</div>
			</div>

			<div className='flex items-center gap-2'>
				<Button size='sm' variant='outline' disabled={!hasSelectedRows} onClick={onAddToWhitelist}>
					Whitelist selected
				</Button>

				<Button size='sm' variant='destructive' disabled={!hasSelectedRows}>
					Unfollow selected
				</Button>

				<form action={onRefresh} className='contents'>
					<Button type='submit' size='icon' variant='ghost' disabled={pending}>
						<RotateCw className={cn(pending && 'animate-spin')} />
					</Button>
				</form>
			</div>
		</header>
	);
}
