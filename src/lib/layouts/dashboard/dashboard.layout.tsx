import { SessionProvider } from 'next-auth/react';

import { DataProvider } from '$lib/contexts/data';
import { PreferencesProvider } from '$lib/contexts/preferences';

import { NavBar } from './navbar';

export function DashboardLayout({ children }: React.PropsWithChildren) {
	return (
		<SessionProvider>
			<PreferencesProvider>
				<DataProvider>
					<NavBar className='md:mt-4' />
					{children}
				</DataProvider>
			</PreferencesProvider>
		</SessionProvider>
	);
}
