'use client';

import Link from 'next/link';
import React from 'react';

import { Button } from '$lib/components/ui/button';
import { DataTable, type RowSelectionState } from '$lib/components/ui/data-table';
import { Spinner } from '$lib/components/ui/spinner';
import { useData } from '$lib/contexts/data';
import { WhitelistToolbar as Toolbar } from '$lib/features/whitelist/components/whitelist-toolbar';
import { cn } from '$lib/utils/ui';

import { columns } from './columns';

type TWhitelistDataTableProps = React.ComponentProps<'div'>;

/**
 * The `WhitelistDataTable` component renders a data table for managing the whitelist.
 *
 * @returns The rendered `WhitelistDataTable` component.
 */
function WhitelistDataTable({ className, ...props }: TWhitelistDataTableProps) {
	const { data, pending, removeFromWhitelist, unfollow } = useData();
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

	const selectedRecords = React.useMemo(() => {
		if (!data.whitelist.length) return [];
		return Object.keys(rowSelection).map((key) => data.whitelist[key]);
	}, [data.whitelist, rowSelection]);

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

	function handleUnfollow() {
		if (!selectedRecords.length) return;
		const selectedUsernames = selectedRecords.map((user) => user.login);
		unfollow(selectedUsernames);
		setRowSelection({});
	}

	return (
		<div className={cn('flex flex-col gap-2', className)} {...props}>
			<Toolbar
				selectedRecords={selectedRecords}
				totalRecords={data.whitelist.length}
				onRemoveFromWhitelist={handleRemoveFromWhitelist}
				onUnfollow={handleUnfollow}
			/>

			<DataTable
				columns={columns}
				data={pending ? [] : data.whitelist}
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
