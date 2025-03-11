import '$lib/styles/global.css';
import { siteMetadata } from '$lib/configs/site';
import { AppLayout } from '$lib/layouts/app';

export const metadata = siteMetadata;

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<AppLayout>{children}</AppLayout>
			</body>
		</html>
	);
}
