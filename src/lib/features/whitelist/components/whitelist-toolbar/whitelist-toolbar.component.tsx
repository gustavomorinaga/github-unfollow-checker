'use client';

import React from 'react';

import { Button } from '$lib/components/ui/button';
import { TUser } from '$lib/types';
import { cn } from '$lib/utils/ui';

import { RotateCw } from 'lucide-react';

export type TWhitelistToolbarProps = React.ComponentProps<'header'> & {
	/**
	 * Whether the toolbar is in a pending state.
	 */
	pending?: boolean;
	/**
	 * The selected records in the whitelist.
	 */
	selectedRecords?: Array<TUser>;
	/**
	 * The total number of records in the whitelist.
	 */
	totalRecords?: number;
	/**
	 * The callback to remove selected records from the whitelist.
	 */
	onRemoveFromWhitelist?: () => void;
	/**
	 * The callback to refresh the whitelist.
	 */
	onRefresh?: () => void;
};

/**
 * The `WhitelistToolbar` component renders a toolbar for managing the whitelist.
 *
 * @returns The rendered toolbar component.
 */
export function WhitelistToolbar({
	className,
	pending = false,
	selectedRecords,
	totalRecords,
	onRemoveFromWhitelist,
	onRefresh,
	...props
}: TWhitelistToolbarProps) {
	const totalSelectedRows = React.useMemo(() => selectedRecords?.length || 0, [selectedRecords]);
	const hasSelectedRows = React.useMemo(() => totalSelectedRows > 0, [totalSelectedRows]);

	return (
		<header className={cn('flex flex-1 items-center justify-between', className)} {...props}>
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
						<p>{hasSelectedRows ? 'selected' : 'whitelisted'}</p>
					</div>
				</div>
			</div>

			<div data-slot='toolbar-actions' className='flex items-center gap-2'>
				<Button
					size='sm'
					variant='outline'
					disabled={!hasSelectedRows}
					onClick={onRemoveFromWhitelist}
				>
					Remove selected
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
