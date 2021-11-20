import { setCookie } from 'nookies';

// --- Hooks ---
import { useFetch } from '@hooks/useFetch';

// --- Components ---
import Loader from '@components/Loader';
import UnfollowersListComponent from './UnfollowersList';

// --- Interfaces ---
import { IUnfollower_Payload } from '@interfaces/IUnfollower';

// --- Services ---
import { api } from '@services/api';

const DAY_SECONDS = 86400;
const WEEK = DAY_SECONDS * 7;

export default function UnfollowCheckerComponent({
	session,
	whitelist,
	handleSetWhitelist,
}): JSX.Element {
	const existUserInWhitelist = (unfollower: string) =>
		whitelist.some((login: string) => login === unfollower);

	const handleAddUserToWhitelist = async (unfollower: string) => {
		if (!existUserInWhitelist(unfollower)) {
			const newWhitelist = [...whitelist, unfollower];
			handleSetWhitelist({ unfollower });

			setCookie(null, 'whitelist', JSON.stringify(newWhitelist), {
				maxAge: WEEK,
				path: '/',
			});

			await mutate(data, false);
		}
	};

	const handleRemoveUserFromWhitelist = async (unfollower: string) => {
		if (existUserInWhitelist(unfollower)) {
			const newWhitelist = whitelist.filter((login: string) => login !== unfollower);
			handleSetWhitelist({ unfollower, remove: true });

			setCookie(null, 'whitelist', JSON.stringify(newWhitelist), {
				maxAge: WEEK,
				path: '/',
			});

			await mutate(data, false);
		}
	};

	const handleUnfollowUser = async (unfollower: string) => {
		await api.delete(`/api/${session.user.login}/${unfollower}`);

		data.diff = data.diff.filter(({ login }) => login !== unfollower);
		data.count--;

		await mutate(data, true);
	};

	let { data, error, mutate } = useFetch<IUnfollower_Payload>(
		`/api/${session.user.login}`
	);

	if (error) return <span>Error!</span>;
	if (!data) return <Loader />;

	return (
		<UnfollowersListComponent
			unfollowers={data.diff}
			whitelist={whitelist}
			handleUnfollowUser={handleUnfollowUser}
			handleAddUserToWhitelist={handleAddUserToWhitelist}
			handleRemoveUserFromWhitelist={handleRemoveUserFromWhitelist}
		/>
	);
}
