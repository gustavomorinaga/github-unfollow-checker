import { NextPage } from 'next';
import { useSession } from 'next-auth/client';
import { NextSeo } from 'next-seo';

// --- Components ---
import Loader from '@components/Loader';
import WelcomeComponent from '@components/Welcome';
import HeaderComponent from '@components/Header';
import UnfollowCheckerComponent from '@components/UnfollowChecker';

const HomePage: NextPage = () => {
	const [session, loading] = useSession();

	if (loading) return <Loader />;

	return (
		<>
			<NextSeo
				title="GitHub Unfollow Checker"
				description="Tool to check who doesn't follow you back on GitHub"
			/>

			{session && <HeaderComponent account={session.user} />}

			<main>{!session ? <WelcomeComponent /> : <UnfollowCheckerComponent />}</main>
		</>
	);
};

export default HomePage;
