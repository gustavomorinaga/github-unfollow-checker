import { generateSiteMetadata } from '$lib/configs/site';
import { UnfollowersView } from '$lib/features/unfollowers/views/unfollowers';

export const metadata = generateSiteMetadata({
	title: 'Unfollowers',
	robots: { follow: false, index: false }
});

export default function UnfollowersPage() {
	return <UnfollowersView />;
}
