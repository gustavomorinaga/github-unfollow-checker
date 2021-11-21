import type { NextApiRequest, NextApiResponse } from 'next';

// --- Services ---
import { api, BASE_URL } from '@services/api';
import { getSession } from 'next-auth/client';

const USERS_PER_PAGE = 100;

export default async function followersHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { accessToken } = await getSession({ req });
	if (!accessToken)
		return res
			.status(401)
			.send({ error: 'User unauthorized or undefined access token!' });

	const {
		method,
		query: { login },
	} = req;

	const requestConfig = {
		headers: {
			Authorization: `token ${accessToken}`,
		},
	};

	if (method === 'GET') {
		try {
			if (!login) res.status(400).send({ error: 'Login not found in the params!' });

			let followers = [];
			let following = [];

			let tempFollowersCount = 0;
			let tempFollowingCount = 0;

			let followersPage = 1;
			let followingPage = 1;

			do {
				const { data } = await api.get(
					`${BASE_URL}/users/${login}/followers?page=${followersPage}&per_page=${USERS_PER_PAGE}`,
					requestConfig
				);
				followers = [...followers, ...data];
				tempFollowersCount = data.length;
				followersPage++;
			} while (tempFollowersCount <= USERS_PER_PAGE && tempFollowersCount > 0);
			do {
				const { data } = await api.get(
					`${BASE_URL}/users/${login}/following?page=${followingPage}&per_page=${USERS_PER_PAGE}`,
					requestConfig
				);
				following = [...following, ...data];
				tempFollowingCount = data.length;
				followingPage++;
			} while (tempFollowingCount <= USERS_PER_PAGE && tempFollowingCount > 0);

			const diffUsers = following.filter(follower =>
				followers.every(follow => !follow.login.includes(follower.login))
			);

			const diff = diffUsers.map(({ login, html_url, avatar_url }) => ({
				login,
				html_url,
				avatar_url,
			}));

			diff.sort((a, b) => a.login.localeCompare(b.login));

			return res.status(200).send(diff);
		} catch (error) {
			return res.status(500).send({ error });
		}
	}

	res.setHeader('Allow', ['GET']);
	res.status(405).end(`Method ${method} Not Allowed`);
}
