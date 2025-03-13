import { SessionProvider } from 'next-auth/react';
import { NavBar } from './navbar';

export function DashboardLayout({ children }: React.PropsWithChildren) {
	return (
		<SessionProvider>
			<NavBar className='mt-4' />
			{children}
		</SessionProvider>
	);
}
