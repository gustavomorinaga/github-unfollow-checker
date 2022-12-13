import { Session } from 'next-auth';

export interface ISession extends Session {
	user: Session['user'];
	accessToken?: string;
}
