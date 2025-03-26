import { generateSiteMetadata } from '$lib/configs/site';
import { LoginView } from '$lib/features/auth/views/login';

export const metadata = generateSiteMetadata({
	title: 'Login',
	robots: { follow: false, index: false }
});

export default async function LoginPage() {
	return <LoginView />;
}
