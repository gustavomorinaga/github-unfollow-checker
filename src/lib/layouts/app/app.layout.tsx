import { ThemeProvider } from '$lib/components/theme';
import { TooltipProvider } from '$lib/components/ui/tooltip';
import { Content } from '$lib/layouts/shared/content';
import { Footer } from '$lib/layouts/shared/footer';
import { Header } from '$lib/layouts/shared/header';
import { Wrapper } from '$lib/layouts/shared/wrapper';

/**
 * The `AppLayout` component provides the main layout structure for the application.
 * It includes a `ThemeProvider` for managing themes, a `TooltipProvider` for tooltips,
 * and a `Wrapper` that contains the `Header`, `Content`, and `Footer` components.
 *
 * @param props - The properties passed to the component.
 * @param props.children - The child components to be rendered within the layout.
 *
 * @returns The rendered AppLayout component.
 */
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
