'use client';

import React from 'react';

import { Button } from '$lib/components/ui/button';
import { useDataTable } from '$lib/features/shared/components/base-table/base-data-table-context';
import { abbreviateNumber } from '$lib/utils/formatters';
import { cn } from '$lib/utils/ui';

export type TBaseDataTableToolbarProps = React.ComponentProps<'header'>;

/**
 * The `BaseDataTableToolbar` component renders a toolbar for managing data tables.
 *
 * @returns The rendered toolbar component.
 */
export function BaseDataTableToolbar({
	className,
	children,
	...props
}: TBaseDataTableToolbarProps) {
	const { table } = useDataTable();

	return (
		<header className={cn('flex flex-1 items-center justify-between', className)} {...props}>
			<div className='flex items-center gap-2'>
				<Button
					size='sm'
					variant='ghost'
					disabled={!table.getIsAllPageRowsSelected()}
					onClick={() => table.toggleAllRowsSelected(table.getIsSomeRowsSelected())}
					className='disabled:invisible'
				>
					<span className='select-none'>
						{table.getIsAllRowsSelected() ? 'Unselect all' : 'Select all'}{' '}
						{abbreviateNumber(table.getRowCount())}
					</span>
				</Button>
			</div>

			<div data-slot='toolbar-actions' className='flex items-center gap-2'>
				{children}
			</div>
		</header>
	);
}
