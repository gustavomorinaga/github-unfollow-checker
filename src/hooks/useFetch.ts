import useSWR, { SWRConfiguration } from 'swr';

// --- Services ---
import { fetcher } from '@services/api';

interface IUseFetchOpts extends SWRConfiguration {
	method?: string;
	body?: any;
}

const SECONDS = 30;

export function useFetch<Data = any, Error = any>(url: string, opts?: IUseFetchOpts) {
	const { data, error, mutate, isValidating } = useSWR<Data, Error>(
		url,
		async url => {
			const response = await fetcher(`${url}`, opts.method || 'GET', opts.body || {});

			return response;
		},
		{
			...opts,
			refreshInterval: SECONDS * 1000,
		}
	);

	return { data, error, mutate, isValidating };
}
