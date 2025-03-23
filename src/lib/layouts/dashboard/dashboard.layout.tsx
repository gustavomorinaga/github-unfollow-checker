'use client';

import { SessionProvider } from 'next-auth/react';

import { Compose } from '$lib/components/ui/compose';
import { DataProvider } from '$lib/contexts/data';
import { PreferencesProvider } from '$lib/contexts/preferences';
import { ErrorBoundary } from '$lib/features/shared/components/error-boundary';

import { NavBar } from './navbar';

/**
 * The `DashboardLayout` component provides the dashboard layout structure for the application.
 *
 * @returns The rendered `DashboardLayout` component.
 */
export function DashboardLayout({ children }: React.PropsWithChildren) {
	return (
		<Compose components={[SessionProvider, PreferencesProvider, DataProvider]}>
			<div className='mx-auto flex w-full max-w-screen-md flex-col'>
				<NavBar className='md:mt-4' />
				{children}
				<ErrorBoundary />
			</div>
		</Compose>
	);
}
