'use client';

import React from 'react';

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '$lib/components/ui/dropdown-menu';
import type { TUser } from '$lib/types';

export type TFilters = { type: Array<TUser['type']> };

type TFiltersDropdownMenuProps = React.ComponentProps<typeof DropdownMenu> & {
	filters: TFilters;
	contentProps?: React.ComponentProps<typeof DropdownMenuContent>;
	onFiltersChange?: (filters: TFilters) => void;
};

export function FiltersDropdownMenu({
	children,
	filters,
	contentProps,
	onFiltersChange,
	...props
}: TFiltersDropdownMenuProps) {
	function handleFiltersChange(checked: boolean, type: TUser['type']) {
		if (!onFiltersChange) return;

		const updatedTypes = checked
			? [...filters.type, type]
			: filters.type.filter((filter) => filter !== type);

		onFiltersChange({ ...filters, type: updatedTypes });
	}

	return (
		<DropdownMenu {...props}>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent {...contentProps}>
				<DropdownMenuLabel>Filters</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					checked={filters.type.includes('Organization')}
					disabled={filters.type.length === 1 && filters.type.includes('Organization')}
					onCheckedChange={(checked) => handleFiltersChange(checked, 'Organization')}
				>
					Organizations
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={filters.type.includes('User')}
					disabled={filters.type.length === 1 && filters.type.includes('User')}
					onCheckedChange={(checked) => handleFiltersChange(checked, 'User')}
				>
					Users
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
