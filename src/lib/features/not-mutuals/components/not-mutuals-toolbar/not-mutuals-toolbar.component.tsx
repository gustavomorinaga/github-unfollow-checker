'use client';

import React from 'react';

import { Button } from '$lib/components/ui/button';
import { useData } from '$lib/contexts/data';
import { TUser } from '$lib/types';
import { abbreviateNumber } from '$lib/utils/formatters';
import { cn } from '$lib/utils/ui';

import { RotateCw } from 'lucide-react';

export type TNotMutualsToolbarProps = React.ComponentProps<'header'> & {
	/**
	 * The selected records in the table.
	 */
	selectedRecords?: Array<TUser>;
	/**
	 * The total number of records in the table.
	 */
	totalRecords?: number;
	/**
	 * The callback to add selected records to the whitelist.
	 */
	onAddToWhitelist?: () => void;
	/**
	 * Callback to follow selected records.
	 */
	onFollow?: () => void;
};

/**
 * The `NotMutualsToolbar` component renders a toolbar for managing the not mutuals list.
 *
 * @returns The rendered toolbar component.
 */
export function NotMutualsToolbar({
	className,
	selectedRecords = [],
	totalRecords = 0,
	onAddToWhitelist,
	onFollow,
	...props
}: TNotMutualsToolbarProps) {
	const { pending, refresh } = useData();

	const totalSelectedRows = React.useMemo(() => selectedRecords.length, [selectedRecords]);
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
						<p>{hasSelectedRows ? 'selected' : 'not mutuals'}</p>
					</div>
				</div>
			</div>

			<div data-slot='toolbar-actions' className='flex items-center gap-2'>
				<Button size='sm' variant='outline' disabled={!hasSelectedRows} onClick={onAddToWhitelist}>
					Whitelist selected
				</Button>

				<Button size='sm' disabled={!hasSelectedRows} onClick={onFollow}>
					Follow selected
				</Button>

				<div className='contents'>
					<Button size='icon' variant='ghost' disabled={pending} onClick={refresh}>
						<RotateCw />
					</Button>
				</div>
			</div>
		</header>
	);
}
