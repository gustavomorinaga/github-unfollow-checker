import { ThemeProvider } from '$lib/components/theme';
import { Toaster } from '$lib/components/ui/sonner';
import { Content } from '$lib/layouts/shared/content';
import { Wrapper } from '$lib/layouts/shared/wrapper';

import { Footer } from './footer';
import { Header } from './header';

type TAppLayoutProps = React.PropsWithChildren;

/**
 * The `AppLayout` component provides the main layout structure for the application.
 *
 * @returns The rendered AppLayout component.
 */
export function AppLayout({ children }: TAppLayoutProps) {
	return (
		<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
			<Wrapper>
				<Header />
				<Content>{children}</Content>
				<Footer />
			</Wrapper>
			<Toaster />
		</ThemeProvider>
	);
}
