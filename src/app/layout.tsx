import '$lib/styles/global.css';
import { siteMetadata } from '$lib/configs/site';
import { AppLayout as Layout } from '$lib/layouts/app';

export const metadata = siteMetadata;

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}
