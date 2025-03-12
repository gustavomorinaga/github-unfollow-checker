import { UnfollowersView } from '$lib/features/unfollowers/views/unfollowers';
import { SessionProvider } from 'next-auth/react';

export default function UnfollowersPage() {
	return (
		<SessionProvider>
			<UnfollowersView />
		</SessionProvider>
	);
}
