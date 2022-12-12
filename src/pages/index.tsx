import { NextPage } from 'next';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

// --- Components ---
import Loader from '@components/Loader';
import HeaderComponent from '@components/Header';
import FooterComponent from '@components/Footer';
import WelcomeComponent from '@components/Welcome';
import UnfollowCheckerComponent from '@components/UnfollowChecker';

// --- Interfaces ---
import { ISession } from '@interfaces/ISession';

export async function getServerSideProps() {
	const whitelist = [];
	if (typeof window !== 'undefined') JSON.parse(localStorage.getItem('whitelist'));

	return {
		props: {
			whitelist,
		},
	};
}

const HomePage: NextPage<{ whitelist?: string[] }> = props => {
	const { data: session, status } = useSession();
	const [whitelist, setWhitelist] = useState(props.whitelist);

	const handleSetWhitelist = ({
		unfollower,
		remove,
	}: {
		unfollower: string;
		remove?: boolean;
	}) =>
		remove
			? setWhitelist(whitelist.filter((login: string) => login !== unfollower))
			: setWhitelist([...whitelist, unfollower]);

	if (status === 'loading') return <Loader />;

	return (
		<>
			{session && <HeaderComponent account={session.user} />}

			<main>
				{!session ? (
					<WelcomeComponent />
				) : (
					<UnfollowCheckerComponent
						session={session as ISession}
						whitelist={whitelist}
						handleSetWhitelist={handleSetWhitelist}
					/>
				)}
			</main>

			<FooterComponent />
		</>
	);
};

export default HomePage;
