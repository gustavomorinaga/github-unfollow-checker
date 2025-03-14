import { SessionProvider } from 'next-auth/react';
import { NavBar } from './navbar';
import { DataProvider } from '$lib/contexts/data';

export function DashboardLayout({ children }: React.PropsWithChildren) {
	return (
		<SessionProvider>
			<DataProvider>
				<NavBar className='mt-4' />
				{children}
			</DataProvider>
		</SessionProvider>
	);
}
