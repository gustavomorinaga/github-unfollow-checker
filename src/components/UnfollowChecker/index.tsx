// --- Hooks ---
import { useFetch } from '@hooks/useFetch';

// --- Components ---
import Loader from '@components/Loader';
import ErrorComponent from '@components/Error';
import UnfollowersListComponent from './UnfollowersList';

// --- Interfaces ---
import { IUnfollower } from '@interfaces/IUnfollower';
import { IView } from '@interfaces/IView';
import { ISession } from '@interfaces/ISession';

// --- Services ---
import { api } from '@services/api';

interface IUnfollowCheckerProps {
	session: ISession;
	whitelist?: string[];
	handleSetWhitelist?: (props: { unfollower: string; remove?: boolean }) => void;
}

export default function UnfollowCheckerComponent({
	session,
	whitelist,
	handleSetWhitelist,
}: IUnfollowCheckerProps): JSX.Element {
	let { data, error, mutate } = useFetch<IUnfollower[]>(`/api/${session.user.login}`, {
		headers: { 'x-access-token': session.accessToken },
	});

	const existUserInWhitelist = (unfollower: string) =>
		whitelist.some((login: string) => login === unfollower);

	const handleAddUserToWhitelist = async (unfollower: string) => {
		if (!existUserInWhitelist(unfollower)) {
			const newWhitelist = [...whitelist, unfollower];
			handleSetWhitelist({ unfollower });

			localStorage.setItem('whitelist', JSON.stringify(newWhitelist));

			await mutate(data, false);
		}
	};

	const handleRemoveUserFromWhitelist = async (unfollower: string) => {
		if (existUserInWhitelist(unfollower)) {
			const newWhitelist = whitelist.filter((login: string) => login !== unfollower);
			handleSetWhitelist({ unfollower, remove: true });

			localStorage.setItem('whitelist', JSON.stringify(newWhitelist));

			await mutate(data, false);
		}
	};

	const handleUnfollowUser = async (unfollower: string, view: IView) => {
		const isUserUnfollowed = await api.delete(
			`/api/${session.user.login}/${unfollower}`,
			{ headers: { 'x-access-token': session.accessToken } }
		);

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
				headers: { 'x-access-token': session.accessToken },
				data: { unfollowers: filteredUsers },
			}
		);

		if (!isAllUsersUnfollowed) return;

		if (view === IView.WHITELIST) whitelist.length = 0;

		localStorage.setItem('whitelist', JSON.stringify([]));

		data = data.filter(({ login }) => !filteredUsers.includes(login));

		await mutate(data, false);
	};

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
