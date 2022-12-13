import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';

// --- Services ---
import { api, BASE_URL } from '@services/api';

export default async function followersHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		method,
		headers,
		query: { login, unfollower },
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
		try {
			if (!login || !unfollower)
				return res
					.status(400)
					.send({ error: 'Login and Unfollower not found in the params!' });

			await api.delete(`${BASE_URL}/user/following/${unfollower}`, requestConfig);

			return res.status(200).send({ message: 'User unfollowed!' });
		} catch (error) {
			if (error instanceof AxiosError) {
				return res.status(error.response.status).send(error.response.data);
			}
		}
	}

	res.setHeader('Allow', ['DELETE']);
	res.status(405).end(`Method ${method} Not Allowed`);
}
