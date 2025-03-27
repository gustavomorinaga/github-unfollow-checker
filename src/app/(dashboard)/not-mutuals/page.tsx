import { generateSiteMetadata } from '$lib/configs/site';
import { NotMutualsView } from '$lib/features/not-mutuals/views/not-mutuals';

export const metadata = generateSiteMetadata({
	title: 'Not Mutuals',
	robots: { follow: false, index: false }
});

export default function NotMutualsPage() {
	return <NotMutualsView />;
}
