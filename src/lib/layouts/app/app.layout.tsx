import { ThemeProvider } from '$lib/components/theme';
import { TooltipProvider } from '$lib/components/ui/tooltip';
import { Content } from '$lib/layouts/shared/content';
import { Footer } from '$lib/layouts/shared/footer';
import { Header } from '$lib/layouts/shared/header';
import { Wrapper } from '$lib/layouts/shared/wrapper';

export function AppLayout({ children }: React.PropsWithChildren) {
	return (
		<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
			<TooltipProvider>
				<Wrapper>
					<Header />
					<Content>{children}</Content>
					<Footer />
				</Wrapper>
			</TooltipProvider>
		</ThemeProvider>
	);
}
