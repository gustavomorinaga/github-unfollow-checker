import { auth } from '$lib/auth';
import { NextResponse } from 'next/server';

const GITHUB_API_URL = 'https://api.github.com';

export const GET = auth(async (request) => {
	if (!request.auth) {
		return NextResponse.json(
			{ error: 'Unauthorized' },
			{ status: 401, headers: { 'Content-Type': 'application/json' } }
		);
	}

	const { searchParams } = request.nextUrl;

	const page = Number.parseInt(searchParams.get('page')!) || 1;
	if (page < 1) {
		return NextResponse.json(
			{ error: 'Page must be a positive integer' },
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	const per_page = Number.parseInt(searchParams.get('per_page')!) || 10;
	if (per_page < 1) {
		return NextResponse.json(
			{ error: 'Per page must be a positive integer' },
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}
	if (per_page > 100) {
		return NextResponse.json(
			{ error: 'Per page must be less than or equal to 100' },
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}

	const { accessToken, user } = request.auth;

	const followersURL = new URL(`${GITHUB_API_URL}/users/${user.login}/followers`);
	followersURL.searchParams.set('page', page.toString());
	followersURL.searchParams.set('per_page', per_page.toString());

	const followingURL = new URL(`${GITHUB_API_URL}/users/${user.login}/following`);
	followingURL.searchParams.set('page', page.toString());
	followingURL.searchParams.set('per_page', per_page.toString());

	const sharedRequestHeaders: RequestInit = {
		headers: {
			Authorization: `token ${accessToken}`,
			accept: 'application/vnd.github+json'
		}
	};

	const [fetchedFollowers, fetchedFollowing] = await Promise.all([
		fetch(followersURL, sharedRequestHeaders).then((res) => res.json()),
		fetch(followingURL, sharedRequestHeaders).then((res) => res.json())
	]);

	return NextResponse.json({ fetchedFollowers, fetchedFollowing });
});
