import { auth } from '$lib/auth';
import { UnfollowersDataTable } from '$lib/features/unfollowers/components/unfollowers-table';
import type { TUser } from '$lib/types';
import { headers } from 'next/headers';

async function getData() {
	const session = await auth();
	const baseURL = (await headers()).get('referer')!;
	const apiURL = new URL(`/api/${session?.user.login}/unfollowers`, baseURL);

	return fetch(apiURL, {
		headers: { Authorization: `Bearer ${session?.accessToken}` },
		cache: 'force-cache'
	}).then<Array<TUser>>((res) => res.json());
}

export default async function HomePage() {
	const data = await getData();

	return (
		<UnfollowersDataTable
			data={data}
			className='py-4 [&_thead>tr]:!bg-transparent [&>div]:overflow-hidden [&>header]:absolute [&>header]:top-[74px] [&>header]:z-20 [&>header]:w-fit [&>header]:translate-x-16'
		/>
	);
}
