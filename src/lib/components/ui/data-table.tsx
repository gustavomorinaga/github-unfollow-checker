'use client';

import {
	flexRender,
	getCoreRowModel,
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
import { cn } from '$lib/utils/ui';

interface DataTableProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	feedback?: React.ReactNode;
	rowSelection?: RowSelectionState;
	setRowSelection?: (rowSelection: RowSelectionState) => void;
}

function DataTable<TData, TValue>({
	className,
	columns,
	data,
	feedback = 'No results.',
	rowSelection,
	setRowSelection
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		state: { rowSelection }
	});

	return (
		<div className={cn('rounded-md border', className)}>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										colSpan={header.colSpan}
										style={{
											width: header.column.columnDef.size || undefined
										}}
									>
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
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										style={{
											width: cell.column.columnDef.size || undefined
										}}
									>
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
	);
}

export { DataTable, type RowSelectionState };
