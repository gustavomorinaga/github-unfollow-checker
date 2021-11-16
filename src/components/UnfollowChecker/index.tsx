import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';

// --- Hooks ---
import { useFetch } from '@hooks/useFetch';

// --- Components ---
import Loader from '@components/Loader';
import UnfollowersListComponent from './UnfollowersList';

// --- Interfaces ---
import { IUnfollower_Payload } from '@interfaces/IUser';

// --- Services ---
import { api } from '@services/api';

export default function UnfollowCheckerComponent(): JSX.Element {
	const [session, loading] = useSession();
	const [whitelist, setWhitelist] = useState([]);

	useEffect(() => {
		const getWhitelist = () => {
			const whitelistStorage = JSON.parse(
				localStorage.getItem(`${session.user.login}/whitelist`)
			);
			if (!whitelistStorage)
				localStorage.setItem(`${session.user.login}/whitelist`, '[]');
			setWhitelist(whitelistStorage || []);
		};

		getWhitelist();
	}, [session, setWhitelist]);

	let { data, error, mutate } = useFetch<IUnfollower_Payload>(
		whitelist ? `/api/${session.user.login}` : null,
		{ method: 'POST', body: { whitelist } }
	);

	const handleAddUserToWhitelist = async (unfollower: string) => {
		setWhitelist([...whitelist, unfollower]);
		localStorage.setItem(
			`${session.user.login}/whitelist`,
			JSON.stringify([...whitelist, unfollower])
		);

		data.diff = data.diff.filter(({ login }) => login !== unfollower);
		data.count--;

		await mutate(data, false);
	};

	const handleUnfollowUser = async (unfollower: string) => {
		await api.delete(`/api/${session.user.login}/${unfollower}`);

		data.diff = data.diff.filter(({ login }) => login !== unfollower);
		data.count--;

		await mutate(data, true);
	};

	if (error) return <span>Error!</span>;
	if (!data || loading) return <Loader />;

	return (
		<UnfollowersListComponent
			unfollowers={data.diff}
			handleUnfollowUser={handleUnfollowUser}
			handleAddUserToWhitelist={handleAddUserToWhitelist}
		/>
	);
}
