'use client';

import React from 'react';

import type { Table } from '@tanstack/react-table';

interface DataTableContextValue<TData> {
	table: Table<TData>;
	pageSizeOptions: ReadonlyArray<number>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableContext = React.createContext<DataTableContextValue<any> | undefined>(undefined);

/**
 * Provides data table context to its children components.
 *
 * @returns The provider component wrapping its children with data table context.
 *
 * @remarks
 * - The data table context is used to store the table instance and page size options.
 */
export function DataTableProvider<TData>({
	table,
	pageSizeOptions = [10, 20, 30, 40, 50],
	children
}: React.PropsWithChildren<DataTableContextValue<TData>>) {
	const value: DataTableContextValue<TData> = { table, pageSizeOptions };

	return <DataTableContext.Provider value={value}>{children}</DataTableContext.Provider>;
}

/**
 * Custom hook to access the DataTable context.
 *
 * This hook provides access to the DataTable context value, which contains
 * the state and actions related to the data table. It must be used within
 * a `DataTableProvider` to ensure the context is available.
 *
 * @template TData - The type of data used in the data table.
 * @returns The context value for the data table.
 * @throws If the hook is used outside of a `DataTableProvider`.
 */
export function useDataTable<TData>(): DataTableContextValue<TData> {
	const context = React.useContext(DataTableContext);
	if (!context) throw new Error('useDataTable must be used within a DataTableProvider');

	return context;
}
