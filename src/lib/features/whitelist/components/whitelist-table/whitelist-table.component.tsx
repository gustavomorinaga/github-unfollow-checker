'use client';

import Link from 'next/link';
import React from 'react';

import { Button } from '$lib/components/ui/button';
import { Spinner } from '$lib/components/ui/spinner';
import { useData } from '$lib/contexts/data';
import { DataTable } from '$lib/features/shared/components/base-table/base-data-table';
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
	const { data, pending } = useData();

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

	return (
		<div className={cn('flex flex-col gap-2', className)} {...props}>
			<DataTable
				columns={columns}
				data={pending ? [] : data.whitelist}
				feedback={memoizedFeedback}
				className='[&_table]:table-fixed [&_tbody_td_span[data-slot="badge"]]:invisible md:[&_tbody_td_span[data-slot="badge"]]:visible [&_thead_th:not(:has(button[role=checkbox]))_span]:sr-only [&>div]:rounded-none [&>div]:border-x-0 [&>div]:border-y md:[&>div]:rounded-md md:[&>div]:border-x'
			>
				<Toolbar />
			</DataTable>
		</div>
	);
}

const MemoizedWhitelistDataTable = React.memo(WhitelistDataTable);

export { MemoizedWhitelistDataTable as WhitelistDataTable };
