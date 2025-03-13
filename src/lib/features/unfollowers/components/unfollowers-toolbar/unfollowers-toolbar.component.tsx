'use client';

import React from 'react';

import { Button } from '$lib/components/ui/button';
import { TUser } from '$lib/types';
import { abbreviateNumber } from '$lib/utils/formatters';
import { cn } from '$lib/utils/ui';

import { RotateCw } from 'lucide-react';

export type TUnfollowersToolbarProps = React.ComponentProps<'header'> & {
	/**
	 * Whether the toolbar is in a pending state.
	 */
	pending?: boolean;
	/**
	 * The selected records in the table.
	 */
	selectedRecords?: Array<TUser>;
	/**
	 * The total number of records in the table.
	 */
	totalRecords?: number;
	/**
	 * Callback to add selected records to the whitelist.
	 */
	onAddToWhitelist?: () => void;
	/**
	 * Callback to refresh the unfollowers.
	 */
	onRefresh?: () => void;
};

/**
 * The `UnfollowersToolbar` component renders a toolbar for managing unfollowers.
 *
 * @returns The rendered toolbar component.
 */
export function UnfollowersToolbar({
	className,
	pending = false,
	selectedRecords,
	totalRecords = 0,
	onAddToWhitelist,
	onRefresh,
	...props
}: TUnfollowersToolbarProps) {
	const totalSelectedRows = React.useMemo(() => selectedRecords?.length || 0, [selectedRecords]);
	const hasSelectedRows = React.useMemo(() => totalSelectedRows > 0, [totalSelectedRows]);
	const formattedTotalRecords = React.useMemo(() => abbreviateNumber(totalRecords), [totalRecords]);
	const formattedTotalSelectedRows = React.useMemo(
		() => abbreviateNumber(totalSelectedRows),
		[totalSelectedRows]
	);

	return (
		<header className={cn('flex flex-1 items-center justify-between', className)} {...props}>
			<div className='flex items-center gap-2'>
				<div className='text-muted-foreground sr-only flex min-w-20 items-center justify-end gap-1 text-sm md:not-sr-only [&_span]:tabular-nums'>
					{hasSelectedRows && (
						<>
							<span>{formattedTotalSelectedRows}</span>
							<div className='select-none'>/</div>
						</>
					)}
					<div className='contents'>
						<span>{formattedTotalRecords}</span>
						<p>{hasSelectedRows ? 'selected' : 'unfollowers'}</p>
					</div>
				</div>
			</div>

			<div data-slot='toolbar-actions' className='flex items-center gap-2'>
				<Button size='sm' variant='outline' disabled={!hasSelectedRows} onClick={onAddToWhitelist}>
					Whitelist selected
				</Button>

				<Button size='sm' variant='destructive' disabled={!hasSelectedRows}>
					Unfollow selected
				</Button>

				<div className='contents'>
					<Button size='icon' variant='ghost' disabled={pending} onClick={onRefresh}>
						<RotateCw />
					</Button>
				</div>
			</div>
		</header>
	);
}
