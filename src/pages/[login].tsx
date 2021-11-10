import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';

// --- Interfaces ---
import { IUser } from '@interfaces/IUser';

// --- Hooks ---
import { useFetch } from '@hooks/useFetch';

// --- Components ---
import UserComponent from '@components/User';

// -- Animations --
import { slide } from '@animations/index';

const UserPage: NextPage = () => {
	const { query } = useRouter();
	const { login } = query;

	const { data, error } = useFetch<IUser>(login ? `users/${login}` : null);

	return (
		<motion.div
			initial="initial"
			animate="animate"
			exit="exit"
			variants={slide}
			transition={{ type: 'spring', stiffness: 100 }}
			style={{ height: '100%' }}
		>
			<NextSeo
				title={login && !error ? `👤 ${login}` : !error ? 'Loading...' : 'Erro!'}
				description="A short description goes here."
			/>

			<UserComponent user={data} error={error} />
		</motion.div>
	);
};

export default UserPage;
