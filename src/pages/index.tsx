import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

// --- Components ---
import Loader from '@components/Loader';
const Header = dynamic(() => import('@components/Header'));
import Footer from '@components/Footer';
const Welcome = dynamic(() => import('@components/Welcome'));
const UnfollowChecker = dynamic(() => import('@components/UnfollowChecker'));

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
			{session && <Header account={session.user} />}

			<main>
				{!session ? (
					<Welcome />
				) : (
					<UnfollowChecker
						session={session as ISession}
						whitelist={whitelist}
						handleSetWhitelist={handleSetWhitelist}
					/>
				)}
			</main>

			<Footer />
		</>
	);
};

export default HomePage;
