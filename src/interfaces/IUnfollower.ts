export interface IUnfollower {
	avatar_url: string;
	html_url: string;
	login: string;
}

export interface IUnfollower_Payload {
	diff: IUnfollower[];
	count: number;
}
