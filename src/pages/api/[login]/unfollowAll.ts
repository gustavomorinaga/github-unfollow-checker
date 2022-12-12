import type { NextApiRequest, NextApiResponse } from 'next';

// --- Services ---
import { api, BASE_URL } from '@services/api';
import { getSession } from 'next-auth/react';

// --- Interfaces ---
import { ISession } from '@interfaces/ISession';

export default async function followersHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		method,
		headers,
		query: { login },
		body: { unfollowers },
	} = req;

	const accessToken = headers['x-access-token'];
	if (!accessToken)
		return res
			.status(401)
			.send({ error: 'User unauthorized or undefined access token!' });

	const requestConfig = {
		headers: {
			Authorization: `token ${accessToken}`,
		},
	};

	if (method === 'DELETE') {
		if (!login) res.status(400).send({ error: 'Login not found in the params!' });

		unfollowers.forEach(
			async (unfollower: string) =>
				await api.delete(`${BASE_URL}/user/following/${unfollower}`, requestConfig)
		);

		return res.status(200).send({ message: 'Users unfolloweds!' });
	}

	res.setHeader('Allow', ['DELETE']);
	res.status(405).end(`Method ${method} Not Allowed`);
}
