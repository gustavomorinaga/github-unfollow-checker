'use client';

import Link from 'next/link';
import React from 'react';

import { DataTable, type RowSelectionState } from '$lib/components/ui/data-table';
import { Spinner } from '$lib/components/ui/spinner';
import { WhitelistToolbar as Toolbar } from '$lib/features/whitelist/components/whitelist-toolbar';
import { useWhitelist } from '$lib/features/whitelist/hooks';
import { cn } from '$lib/utils/ui';

import { Button } from '$lib/components/ui/button';
import { columns, type TUser } from './columns';

type TWhitelistDataTableProps = React.ComponentProps<'div'> & {
	/**
	 * Array of user data to display in the table.
	 */
	data?: Array<TUser>;
	/**
	 * Whether the table is in a pending state.
	 */
	pending?: boolean;
	/**
	 * Callback to refresh the whitelist.
	 */
	onRefresh: () => void;
};

/**
 * The `WhitelistDataTable` component renders a data table for managing the whitelist.
 *
 * @returns The rendered `WhitelistDataTable` component.
 */
function WhitelistDataTable({
	className,
	data = [],
	pending = false,
	onRefresh,
	...props
}: TWhitelistDataTableProps) {
	const { whitelist, removeFromWhitelist } = useWhitelist();
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

	const onlyWhitelistedData = React.useMemo(() => {
		if (!data.length) return [];
		return data.filter((user) => whitelist.includes(user.id));
	}, [data, whitelist]);

	const selectedRecords = React.useMemo(() => {
		if (!onlyWhitelistedData.length) return [];
		return Object.keys(rowSelection).map((key) => onlyWhitelistedData[key]);
	}, [rowSelection, onlyWhitelistedData]);

	const memoizedFeedback = React.useMemo(() => {
		return (
			<>
				<div className='flex size-full flex-col items-center justify-center'>
					<div className='flex items-center gap-2'>
						{pending && <Spinner />}
						<span>
							{pending ? 'Loading whitelist...' : 'No whitelisted users found. Wanna add some? 🤔'}
						</span>
					</div>

					{!pending && (
						<Link href='/dashboard' className='contents'>
							<Button size='sm' variant='link'>
								Go to dashboard
							</Button>
						</Link>
					)}
				</div>
			</>
		);
	}, [pending]);

	function handleRemoveFromWhitelist() {
		if (!selectedRecords.length) return;
		const selectedUserIDs = selectedRecords.map((user) => user.id);
		removeFromWhitelist(selectedUserIDs);
		setRowSelection({});
	}

	return (
		<div className={cn('flex flex-col gap-2', className)} {...props}>
			<Toolbar
				pending={pending}
				selectedRecords={selectedRecords}
				totalRecords={onlyWhitelistedData.length}
				onRemoveFromWhitelist={handleRemoveFromWhitelist}
				onRefresh={onRefresh}
			/>

			<DataTable
				columns={columns}
				data={pending ? [] : onlyWhitelistedData}
				feedback={memoizedFeedback}
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
				className='rounded-none border-x-0 border-y md:rounded-md md:border-x [&_table]:table-fixed [&_tbody_td_span[data-slot="badge"]]:invisible md:[&_tbody_td_span[data-slot="badge"]]:visible [&_thead_th:not(:has(button[role=checkbox]))_span]:sr-only'
			/>
		</div>
	);
}

const MemoizedWhitelistDataTable = React.memo(WhitelistDataTable);

export { MemoizedWhitelistDataTable as WhitelistDataTable };
