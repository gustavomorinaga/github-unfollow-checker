import { generateSiteMetadata } from '$lib/configs/site';
import { FollowingView } from '$lib/features/following/views/following';

export const metadata = generateSiteMetadata({
	title: 'Following',
	robots: { follow: false, index: false }
});

export default function FollowingPage() {
	return <FollowingView />;
}
