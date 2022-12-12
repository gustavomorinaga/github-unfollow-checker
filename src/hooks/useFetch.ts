import useSWR, { SWRConfiguration } from 'swr';

// --- Services ---
import { fetcher } from '@services/api';

export function useFetch<Data = any, Error = any>(
	url: string,
	opts?: SWRConfiguration & { headers?: any }
) {
	const { data, error, mutate, isValidating } = useSWR<Data, Error>(
		url,
		async url => {
			const response = await fetcher(`${url}`, { headers: opts.headers });

			return response;
		},
		{
			...opts,
			refreshInterval: 60000,
			revalidateIfStale: false,
			revalidateOnReconnect: true,
			revalidateOnFocus: false,
		}
	);

	return { data, error, mutate, isValidating };
}
