// --- Hooks ---
import { useFetch } from '@hooks/useFetch';

// --- Components ---
import Loader from '@components/Loader';
import Error from '@components/Error';
import UnfollowersList from './UnfollowersList';

// --- Interfaces ---
import { IUnfollower } from '@interfaces/IUnfollower';
import { IView } from '@interfaces/IView';
import { ISession } from '@interfaces/ISession';

// --- Services ---
import { api } from '@services/api';
import { useCallback } from 'react';

interface IUnfollowCheckerProps {
	session: ISession;
	whitelist?: string[];
	handleSetWhitelist?: (props: { unfollower: string; remove?: boolean }) => void;
}

export default function UnfollowChecker({
	session,
	whitelist,
	handleSetWhitelist,
}: IUnfollowCheckerProps): JSX.Element {
	let { data, error, mutate } = useFetch<IUnfollower[]>(`/api/${session.user.login}`, {
		headers: { 'x-access-token': session.accessToken },
	});

	const existUserInWhitelist = useCallback(
		(unfollower: string) => whitelist.some((login: string) => login === unfollower),
		[whitelist]
	);

	const handleAddUserToWhitelist = useCallback(
		async (unfollower: string) => {
			if (existUserInWhitelist(unfollower)) return;

			const newWhitelist = [...whitelist, unfollower];
			handleSetWhitelist({ unfollower });

			localStorage.setItem('whitelist', JSON.stringify(newWhitelist));

			await mutate(data, false);
		},
		[data, existUserInWhitelist, handleSetWhitelist, mutate, whitelist]
	);

	const handleRemoveUserFromWhitelist = useCallback(
		async (unfollower: string) => {
			if (!existUserInWhitelist(unfollower)) return;

			const newWhitelist = whitelist.filter((login: string) => login !== unfollower);
			handleSetWhitelist({ unfollower, remove: true });

			localStorage.setItem('whitelist', JSON.stringify(newWhitelist));

			await mutate(data, false);
		},
		[data, existUserInWhitelist, handleSetWhitelist, mutate, whitelist]
	);

	const handleUnfollowUser = useCallback(
		async (unfollower: string, view: IView) => {
			const isUserUnfollowed = await api.delete(
				`/api/${session.user.login}/${unfollower}`,
				{ headers: { 'x-access-token': session.accessToken } }
			);

			if (!isUserUnfollowed) return;

			const filteredData = data.filter(({ login }) => login !== unfollower);

			if (view === IView.WHITELIST) handleSetWhitelist({ unfollower, remove: true });

			await mutate(filteredData, false);
		},
		[data, handleSetWhitelist, mutate, session.accessToken, session.user.login]
	);

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

	if (error) return <Error />;
	if (!data) return <Loader />;

	return (
		<UnfollowersList
			unfollowers={data}
			whitelist={whitelist}
			handleUnfollowUser={handleUnfollowUser}
			handleUnfollowAllUsers={handleUnfollowAllUsers}
			handleAddUserToWhitelist={handleAddUserToWhitelist}
			handleRemoveUserFromWhitelist={handleRemoveUserFromWhitelist}
		/>
	);
}
