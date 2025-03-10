import { DataTable } from '$lib/components/ui/data-table';
import { columns, type TUser } from './columns';

export async function UnfollowersDataTable({ data }: { data: Array<TUser> }) {
	return <DataTable columns={columns} data={data} className='[&_thead]:sr-only' />;
}
