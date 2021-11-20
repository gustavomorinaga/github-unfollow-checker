import { NextPage } from 'next';
import { useState } from 'react';
import { useSession } from 'next-auth/client';
import { NextSeo } from 'next-seo';
import { parseCookies } from 'nookies';

// --- Components ---
import Loader from '@components/Loader';
import WelcomeComponent from '@components/Welcome';
import HeaderComponent from '@components/Header';
import UnfollowCheckerComponent from '@components/UnfollowChecker';

export async function getServerSideProps(context: any) {
	const cookies = parseCookies(context);
	if (!cookies.whitelist) cookies.whitelist = '[]';

	return {
		props: {
			whitelist: JSON.parse(cookies.whitelist),
		},
	};
}

const HomePage: NextPage<{ whitelist?: string[] }> = props => {
	const [session, loading] = useSession();
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

	if (loading) return <Loader />;

	return (
		<>
			<NextSeo
				title="GitHub Unfollow Checker"
				description="Tool to check who doesn't follow you back on GitHub"
			/>

			{session && <HeaderComponent account={session.user} />}

			<main>
				{!session ? (
					<WelcomeComponent />
				) : (
					<UnfollowCheckerComponent
						session={session}
						whitelist={whitelist}
						handleSetWhitelist={handleSetWhitelist}
					/>
				)}
			</main>
		</>
	);
};

export default HomePage;
