import axios from 'axios';

export const api = axios.create();

export const fetcher = async <Data = any>(
	url: string,
	method?: any,
	body?: any
): Promise<Data> => await api(url, { method, data: body }).then<Data>(res => res.data);
