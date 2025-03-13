import { SessionProvider } from 'next-auth/react';

import { UnfollowersView } from '$lib/features/unfollowers/views/unfollowers';

export default function UnfollowersPage() {
	return (
		<SessionProvider>
			<UnfollowersView />
		</SessionProvider>
	);
}
