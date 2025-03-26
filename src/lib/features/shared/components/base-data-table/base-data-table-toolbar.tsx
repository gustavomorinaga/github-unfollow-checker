'use client';

import React from 'react';

import { useDebounce } from 'react-haiku';

import { Button } from '$lib/components/ui/button';
import { useDataTable } from '$lib/features/shared/components/base-data-table/base-data-table-context';
import {
	FiltersDropdownMenu,
	type TFilters
} from '$lib/features/shared/components/filters-dropdown-menu';
import { SearchBarInput } from '$lib/features/shared/components/search-bar-input';
import type { TUser } from '$lib/types';
import { abbreviateNumber } from '$lib/utils/formatters';
import { cn } from '$lib/utils/ui';

import { SlidersHorizontal } from 'lucide-react';

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
	const { table } = useDataTable<TUser>();
	const [searchTerm, setSearchTerm] = React.useState('');
	const [filters, setFilters] = React.useState<TFilters>({ type: ['Organization', 'User'] });
	const debouncedSearchTerm = useDebounce(searchTerm, 700);

	function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
		setSearchTerm(event.target.value);
	}

	React.useEffect(() => {
		table.getColumn('login')?.setFilterValue(debouncedSearchTerm);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchTerm]);

	React.useEffect(() => {
		table.getColumn('type')?.setFilterValue(filters.type);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters.type]);

	return (
		<header className={cn('relative flex flex-col', className)} {...props}>
			<div className='flex gap-2 px-4 md:px-0'>
				<SearchBarInput onInput={handleSearchChange} className='ml-auto w-full md:max-w-sm' />
				<FiltersDropdownMenu
					filters={filters}
					contentProps={{ align: 'end', side: 'bottom', className: 'w-48' }}
					onFiltersChange={setFilters}
				>
					<Button size='icon' variant='outline' aria-label='Filters'>
						<SlidersHorizontal />
						<span className='sr-only select-none'>Filters</span>
					</Button>
				</FiltersDropdownMenu>
			</div>

			<div className='absolute top-[58.5px] right-2 left-10 z-20 flex flex-1 items-center justify-between md:left-12 [&_button]:rounded-sm'>
				<div className='flex items-center gap-2'>
					<Button
						size='sm'
						variant='ghost'
						disabled={!table.getIsAllPageRowsSelected()}
						onClick={() => table.toggleAllRowsSelected(table.getIsSomeRowsSelected())}
						className='disabled:invisible'
					>
						{table.getIsAllRowsSelected() ? 'Unselect all' : 'Select all'}{' '}
						{abbreviateNumber(table.getRowCount())}
					</Button>
				</div>

				<div
					data-slot='toolbar-actions'
					className='flex items-center gap-2 [&>button]:disabled:invisible'
				>
					{children}
				</div>
			</div>
		</header>
	);
}
