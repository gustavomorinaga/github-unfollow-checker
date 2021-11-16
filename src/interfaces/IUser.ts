export interface IUser {
	email: string;
	html_url: string;
	image: string;
	login: string;
	name: string;
}

export interface IUnfollower {
	avatar_url: string;
	html_url: string;
	login: string;
}

export interface IUnfollower_Payload {
	diff: IUnfollower[];
	count: number;
}
