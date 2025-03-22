'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { baseColumns } from '$lib/features/shared/components/base-data-table/base-data-table-columns';
import type { TUser } from '$lib/types';

/**
 * Defines the columns for the Whitelist Table.
 */
const columns: Array<ColumnDef<TUser>> = [...baseColumns];

export { columns, type TUser };
