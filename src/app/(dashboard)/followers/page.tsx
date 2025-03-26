import { generateSiteMetadata } from '$lib/configs/site';
import { FollowersView } from '$lib/features/followers/views/followers';

export const metadata = generateSiteMetadata({
	title: 'Followers',
	robots: { follow: false, index: false }
});

export default function FollowersPage() {
	return <FollowersView />;
}
