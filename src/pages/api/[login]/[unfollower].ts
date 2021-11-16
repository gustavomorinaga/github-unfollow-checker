import type { NextApiRequest, NextApiResponse } from 'next';

// --- Services ---
import { api } from '@services/api';
import { getSession } from 'next-auth/client';

const BASE_URL = 'https://api.github.com';

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
		query: { login, unfollower },
	} = req;

	const requestConfig = {
		headers: {
			Authorization: `token ${accessToken}`,
		},
	};

	if (method === 'DELETE') {
		if (!login || !unfollower)
			res.status(400).send({ error: 'Login and Unfollower not found in the params!' });

		await api.delete(`${BASE_URL}/user/following/${unfollower}`, requestConfig);

		return res.status(200).send({ message: 'User unfollowed!' });
	}

	res.setHeader('Allow', ['DELETE']);
	res.status(405).end(`Method ${method} Not Allowed`);
}
