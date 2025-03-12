import { auth } from '$lib/auth';
import { UnfollowersDataTable } from '$lib/features/unfollowers/components/unfollowers-table';
import type { TUser } from '$lib/types';
import { headers } from 'next/headers';

/**
 * Fetches the list of unfollowers for the authenticated user.
 *
 * This function retrieves the current session using the `auth` function and constructs
 * the API URL for fetching the unfollowers based on the user's login. It then performs
 * a fetch request to the constructed API URL with the appropriate authorization header.
 *
 * @returns A promise that resolves to an array of unfollower users.
 */
async function getData() {
	const session = await auth();
	const baseURL = (await headers()).get('referer')!;
	const apiURL = new URL(`/api/${session?.user.login}/unfollowers`, baseURL);

	return fetch(apiURL, {
		headers: { Authorization: `Bearer ${session?.accessToken}` },
		cache: 'force-cache'
	}).then<Array<TUser>>((res) => res.json());
}

/**
 * Fetches data and renders the `UnfollowersDataTable` component with the retrieved data.
 *
 * @returns A promise that resolves to the `UnfollowersDataTable` component.
 */
export async function UnfollowersView() {
	const data = await getData();

	return (
		<UnfollowersDataTable
			data={data}
			className='py-4 [&_thead>tr]:!bg-transparent [&>div]:overflow-hidden [&>header]:absolute [&>header]:top-[74px] [&>header]:z-20 [&>header]:w-fit [&>header]:translate-x-16'
		/>
	);
}
