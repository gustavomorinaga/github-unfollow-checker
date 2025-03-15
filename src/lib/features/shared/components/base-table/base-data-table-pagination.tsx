'use client';

import { Button } from '$lib/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '$lib/components/ui/select';
import { usePreferences } from '$lib/contexts/preferences';
import { abbreviateNumber } from '$lib/utils/formatters';
import { cn } from '$lib/utils/ui';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { useDataTable } from './base-data-table-context';

type DataTablePaginationProps = React.ComponentProps<'footer'>;

/**
 * The `DataTablePagination` component renders a pagination control for a data table.
 *
 * @returns The rendered pagination control component.
 */
export function DataTablePagination<TData>({ className, ...props }: DataTablePaginationProps) {
	const { table, pageSizeOptions } = useDataTable<TData>();
	const { savePreferences } = usePreferences();

	function handlePageSizeChange(value: string) {
		table.setPageSize(Number.parseInt(value));
		savePreferences({ pageSize: Number.parseInt(value) });
	}

	return (
		<footer
			className={cn('flex flex-wrap items-center justify-between gap-y-2 px-2', className)}
			{...props}
		>
			<div className='text-muted-foreground flex-1 shrink-0 text-sm'>
				{abbreviateNumber(table.getFilteredSelectedRowModel().rows.length)} of{' '}
				{abbreviateNumber(table.getFilteredRowModel().rows.length)} row(s) selected.
			</div>
			<div className='flex items-center space-x-6 lg:space-x-8'>
				<div className='flex items-center space-x-2'>
					<p className='shrink-0 text-sm font-medium'>Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={handlePageSizeChange}
					>
						<SelectTrigger className='h-8 w-[70px]'>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side='top'>
							{pageSizeOptions.map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex min-w-[100px] shrink-0 items-center justify-center text-sm font-medium'>
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</div>
				<div className='flex shrink-0 items-center space-x-2'>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Go to first page</span>
						<ChevronsLeft />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Go to previous page</span>
						<ChevronLeft />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Go to next page</span>
						<ChevronRight />
					</Button>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Go to last page</span>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</footer>
	);
}
