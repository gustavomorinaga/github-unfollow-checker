import { NextResponse, type NextRequest } from 'next/server';

type TGuardHandler<T> = (
	request: NextRequest,
	fetchOptions: RequestInit,
	...params: unknown[]
) => Promise<T>;

/**
 * A middleware that guards a route by checking if the request has a valid access token.
 *
 * @param handler The handler to call if the request has a valid access token.
 * @returns A middleware that checks if the request has a valid access token.
 *
 * @remarks
 * - The access token is expected to be in the `Authorization` header.
 * - The access token is expected to be prefixed with `Bearer `.
 * - If the request does not have a valid access token, a 401 Unauthorized response is returned.
 * - The access token is used to authenticate requests to the GitHub API.
 */
export const guard =
	<T>(handler: TGuardHandler<T>) =>
	async (request: NextRequest, ...params: unknown[]) => {
		const accessToken = request.headers.get('authorization')?.replace('Bearer ', '');
		if (!accessToken) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const fetchOptions: RequestInit = {
			headers: {
				Authorization: `token ${accessToken}`,
				accept: 'application/vnd.github+json'
			}
		};

		return handler(request, fetchOptions, ...params);
	};
