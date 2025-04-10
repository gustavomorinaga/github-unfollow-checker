'use client';

import React from 'react';

import {
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type RowSelectionState
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '$lib/components/ui/table';
import { usePreferences } from '$lib/contexts/preferences';
import { cn } from '$lib/utils/ui';

import { DataTableProvider } from './base-data-table-context';
import { DataTablePagination } from './base-data-table-pagination';

interface DataTableProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	feedback?: React.ReactNode;
	loading?: boolean;
}

/**
 * The `DataTable` component renders a data table.
 *
 * @returns The rendered data table component.
 */
function DataTable<TData, TValue>({
	className,
	children,
	columns,
	data,
	feedback = 'No results.',
	loading = false
}: DataTableProps<TData, TValue>) {
	const { preferences, pageSizeOptions } = usePreferences();
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

	const table = useReactTable({
		data,
		columns,
		initialState: { pagination: { pageIndex: 0, pageSize: preferences.pageSize } },
		state: { rowSelection, sorting: [{ id: 'login', desc: false }] },
		autoResetPageIndex: false,
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onRowSelectionChange: setRowSelection
	});

	return (
		<DataTableProvider table={table} pageSizeOptions={pageSizeOptions}>
			<div className={cn('flex flex-col gap-y-4', className)}>
				{children}
				<div className='overflow-hidden rounded-md border'>
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id} colSpan={header.colSpan}>
												{header.isPlaceholder
													? null
													: flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{!loading && table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={columns.length} className='h-24 text-center'>
										{feedback}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<DataTablePagination />
			</div>
		</DataTableProvider>
	);
}

export { DataTable, type RowSelectionState };
