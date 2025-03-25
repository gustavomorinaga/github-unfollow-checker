import { generateSiteMetadata } from '$lib/configs/site';
import { WhitelistView } from '$lib/features/whitelist/views/whitelist';

export const metadata = generateSiteMetadata({
	title: 'Whitelist',
	robots: { follow: false, index: false }
});

export default function WhitelistPage() {
	return <WhitelistView />;
}
