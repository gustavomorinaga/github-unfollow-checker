import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';

// --- Components ---
import SearchComponent from '@components/Search';

// -- Animations --
import { slide } from '@animations/index';

const HomePage: NextPage = () => {
	const [login, setLogin] = useState('');

	const router = useRouter();

	const handleChangeLogin = ({ currentTarget }) => setLogin(currentTarget.value);

	const handleSearchLogin = (event: Event) => {
		event.preventDefault();
		login && router.push(`/${login.trim()}`, undefined, { shallow: true });
	};

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
				title="🔍 Search GitHub Profile..."
				description="A short description goes here."
			/>

			<SearchComponent
				login={login}
				handleChangeLogin={handleChangeLogin}
				handleSearchLogin={handleSearchLogin}
				placeholder="Search GitHub Profile..."
			/>
		</motion.div>
	);
};

export default HomePage;
