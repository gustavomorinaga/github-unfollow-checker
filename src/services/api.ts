import axios from 'axios';

export const BASE_URL = 'https://api.github.com';

export const api = axios.create({
	headers: {
		accept: 'application/vnd.github+json',
	},
});

export const fetcher = async <Data = any>(
	url: string,
	opts?: {
		method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
		headers?: any;
		body?: any;
	}
): Promise<Data> =>
	await api(url, { ...opts, data: opts.body }).then<Data>(res => res.data);
