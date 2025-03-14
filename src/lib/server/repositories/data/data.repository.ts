import { NextResponse, type NextRequest } from 'next/server';

import { GITHUB_API_URL } from '$lib/server/constants/github';
import type { TUser } from '$lib/types';

async function fetchAllPages(url: URL, headers: RequestInit) {
	let results: Array<TUser> = [];
	let page = 1;
	const per_page = 100;
	let hasMore = true;

	while (hasMore) {
		url.searchParams.set('page', page.toString());
		url.searchParams.set('per_page', per_page.toString());

		const data = await fetch(url, headers).then<Array<TUser>>((res) => res.json());

		results = results.concat(data);
		hasMore = data.length === per_page;
		page++;
	}

	return results;
}

export type TDataResponse = {
	followers: Array<TUser>;
	following: Array<TUser>;
	notMutuals: Array<TUser>;
	unfollowers: Array<TUser>;
};

export const dataHandler = {
	GET: async (request: NextRequest, { params }: { params: Promise<{ username: string }> }) => {
		const accessToken = request.headers.get('authorization')?.replace('Bearer ', '');
		if (!accessToken) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const { username } = await params;

		const followersURL = new URL(`${GITHUB_API_URL}/users/${username}/followers`);
		const followingURL = new URL(`${GITHUB_API_URL}/users/${username}/following`);

		const sharedRequestHeaders: RequestInit = {
			headers: {
				Authorization: `token ${accessToken}`,
				accept: 'application/vnd.github+json'
			}
		};

		const [followers, following] = await Promise.all([
			fetchAllPages(followersURL, sharedRequestHeaders),
			fetchAllPages(followingURL, sharedRequestHeaders)
		]);

		const followersSet = new Set(followers.map((follower) => follower.login));
		const followingSet = new Set(following.map((following) => following.login));

		const notMutuals = followers.filter((follower) => !followingSet.has(follower.login));
		const unfollowers = following.filter((following) => !followersSet.has(following.login));

		const response: TDataResponse = { followers, following, notMutuals, unfollowers };

		return NextResponse.json(response);
	},
	PUT: async (request: NextRequest) => {
		const accessToken = request.headers.get('authorization')?.replace('Bearer ', '');
		if (!accessToken) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const { usernames: usernamesToFollow }: { usernames: Array<TUser['login']> } =
			await request.json();

		const sharedRequestHeaders: RequestInit = {
			method: 'PUT',
			headers: {
				Authorization: `token ${accessToken}`,
				accept: 'application/vnd.github+json'
			}
		};

		const followPromises = usernamesToFollow.map((username) => {
			const url = new URL(`${GITHUB_API_URL}/user/following/${username}`);
			return fetch(url, sharedRequestHeaders);
		});

		await Promise.all(followPromises);

		return NextResponse.json({ success: true });
	},
	DELETE: async (request: NextRequest) => {
		const accessToken = request.headers.get('authorization')?.replace('Bearer ', '');
		if (!accessToken) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const { usernames: usernamesToUnfollow }: { usernames: Array<TUser['login']> } =
			await request.json();

		const sharedRequestHeaders: RequestInit = {
			method: 'DELETE',
			headers: {
				Authorization: `token ${accessToken}`,
				accept: 'application/vnd.github+json'
			}
		};

		const unfollowPromises = usernamesToUnfollow.map((username) => {
			const url = new URL(`${GITHUB_API_URL}/user/following/${username}`);
			return fetch(url, sharedRequestHeaders);
		});

		await Promise.all(unfollowPromises);

		return NextResponse.json({ success: true });
	}
};
