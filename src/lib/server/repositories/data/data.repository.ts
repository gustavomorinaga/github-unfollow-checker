import { NextResponse, type NextRequest } from 'next/server';

import { deflate } from '@rescale/slim';

import { GITHUB_API_URL } from '$lib/server/constants/github';
import type { TUser } from '$lib/types';

/**
 * The number of items to fetch per page.
 * Maximum is 100 according to GitHub API.
 */
const ITEMS_PER_PAGE = 100;

export type TDataResponse = {
	followers: Array<TUser>;
	following: Array<TUser>;
	notMutuals: Array<TUser>;
	unfollowers: Array<TUser>;
};

/**
 * Fetches all pages of data from a paginated API endpoint.
 *
 * @returns A promise that resolves to an array of TUser objects containing all the fetched data.
 */
async function fetchAllPages(url: URL, headers: RequestInit) {
	let results: Array<TUser> = [];
	let page = 1;
	let hasMore = true;

	while (hasMore) {
		url.searchParams.set('page', page.toString());
		url.searchParams.set('per_page', ITEMS_PER_PAGE.toString());

		const data = await fetch(url, headers).then<Array<TUser>>((res) => res.json());

		results = results.concat(data);
		hasMore = data.length === ITEMS_PER_PAGE;
		page++;
	}

	return results;
}

type TDataHandler = {
	/**
	 * Fetches the followers, following, not mutuals, and unfollowers of a user.
	 */
	GET: (
		request: NextRequest,
		{ params }: { params: Promise<{ username: string }> }
	) => Promise<NextResponse<string | { error: string }>>;
	/**
	 * Follows users.
	 */
	PUT: (request: NextRequest) => Promise<NextResponse<{ success: boolean } | { error: string }>>;
	/**
	 * Unfollows users.
	 */
	DELETE: (request: NextRequest) => Promise<NextResponse<{ success: boolean } | { error: string }>>;
};

/**
 * Handles the data requests.
 */
export const dataHandler: TDataHandler = {
	GET: async (request, { params }) => {
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

		const [fetchedFollowers, fetchedFollowing] = await Promise.all([
			fetchAllPages(followersURL, sharedRequestHeaders),
			fetchAllPages(followingURL, sharedRequestHeaders)
		]);

		const followersSet = new Set(fetchedFollowers.map((follower) => follower.login));
		const followingSet = new Set(fetchedFollowing.map((following) => following.login));
		const notMutualsSet = new Set([...followersSet].filter((login) => !followingSet.has(login)));
		const unfollowersSet = new Set([...followingSet].filter((login) => !followersSet.has(login)));

		const followers = fetchedFollowers.map((follower) => ({
			...follower,
			followedBy: !notMutualsSet.has(follower.login)
		}));
		const following = fetchedFollowing.map((following) => ({
			...following,
			followedBy: true
		}));
		const notMutuals = fetchedFollowers
			.filter((follower) => notMutualsSet.has(follower.login))
			.map((follower) => ({ ...follower, followedBy: false }));
		const unfollowers = fetchedFollowing
			.filter((following) => unfollowersSet.has(following.login))
			.map((following) => ({ ...following, followedBy: true }));

		const data: TDataResponse = { followers, following, notMutuals, unfollowers };
		const response = deflate(data);

		return NextResponse.json(response);
	},
	PUT: async (request) => {
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
	DELETE: async (request) => {
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
