import { setCookie } from 'nookies';

// --- Hooks ---
import { useFetch } from '@hooks/useFetch';

// --- Components ---
import Loader from '@components/Loader';
import ErrorComponent from '@components/Error';
import UnfollowersListComponent from './UnfollowersList';

// --- Interfaces ---
import { IUnfollower } from '@interfaces/IUnfollower';
import { IView } from '@interfaces/IView';

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

	const handleUnfollowUser = async (unfollower: string, view: IView) => {
		const isUserUnfollowed = await api.delete(`/api/${session.user.login}/${unfollower}`);

		if (isUserUnfollowed) {
			data = data.filter(({ login }) => login !== unfollower);

			if (view === IView.WHITELIST) handleSetWhitelist({ unfollower, remove: true });
		}

		await mutate(data, false);
	};

	const handleUnfollowAllUsers = async (view: IView) => {
		const filteredUsers = data
			.map(({ login }) => login)
			.filter(login =>
				view === IView.UNFOLLOWERS
					? !whitelist.includes(login)
					: whitelist.includes(login)
			);

		const isAllUsersUnfollowed = await api.delete(
			`/api/${session.user.login}/unfollowAll`,
			{
				data: { unfollowers: filteredUsers },
			}
		);

		if (!isAllUsersUnfollowed) return;

		if (view === IView.WHITELIST) whitelist.length = 0;

		setCookie(null, 'whitelist', JSON.stringify([]), {
			maxAge: WEEK,
			path: '/',
		});

		data = data.filter(({ login }) => !filteredUsers.includes(login));

		await mutate(data, false);
	};

	let { data, error, mutate } = useFetch<IUnfollower[]>(`/api/${session.user.login}`);

	if (error) return <ErrorComponent />;
	if (!data) return <Loader />;

	return (
		<UnfollowersListComponent
			unfollowers={data}
			whitelist={whitelist}
			handleUnfollowUser={handleUnfollowUser}
			handleUnfollowAllUsers={handleUnfollowAllUsers}
			handleAddUserToWhitelist={handleAddUserToWhitelist}
			handleRemoveUserFromWhitelist={handleRemoveUserFromWhitelist}
		/>
	);
}
