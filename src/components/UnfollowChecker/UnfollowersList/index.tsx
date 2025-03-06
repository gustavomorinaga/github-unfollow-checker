import { useState, type JSX } from 'react';
import { AnimatePresence, Reorder } from 'framer-motion';

// --- Interfaces ---
import { IUnfollower } from '@interfaces/IUnfollower';
import { IView } from '@interfaces/IView';

// --- Styles ---
import { FaUsers, FaUsersSlash } from 'react-icons/fa';

// --- Components ---
import Unfollower from '../Unfollower';

// --- Animations ---
import slideFade from '@animations/slideFade';

export default function UnfollowersList({
	unfollowers,
	whitelist,
	handleUnfollowUser,
	handleUnfollowAllUsers,
	handleAddUserToWhitelist,
	handleRemoveUserFromWhitelist,
}: {
	unfollowers: IUnfollower[];
	whitelist: string[];
	handleUnfollowUser: (unfollower: string, view: IView) => Promise<void>;
	handleUnfollowAllUsers: (view: IView) => Promise<void>;
	handleAddUserToWhitelist: (unfollower: string) => Promise<void>;
	handleRemoveUserFromWhitelist: (unfollower: string) => Promise<void>;
}): JSX.Element {
	const [view, setView] = useState<IView>(IView.UNFOLLOWERS);
	const [users, setUsers] = useState(unfollowers);

	const handleChangeView = () =>
		setView(view === IView.UNFOLLOWERS ? IView.WHITELIST : IView.UNFOLLOWERS);

	return (
		<div className="relative md:w-4/6 w-full h-full md:pb-16 pb-24 mb-44 overflow-hidden">
			<header className="flex md:flex-row flex-col items-center justify-between gap-2 md:mr-0 mr-4 mb-4">
				<span className="md:pl-4 pl-0 font-sans text-gray-200">
					{view === IView.WHITELIST ? (
						<>
							<strong>{whitelist.length}</strong> users in the whitelist
						</>
					) : (
						<>
							<strong>
								{unfollowers.length - whitelist.length < 0
									? 0
									: unfollowers.length - whitelist.length}
							</strong>
							&nbsp;users don&apos;t follow you back
						</>
					)}
				</span>
				<div className="md:w-auto w-full flex items-center gap-4 md:pl-0 pl-4">
					{view === IView.UNFOLLOWERS ? (
						<button
							className="button md:w-auto w-full md:justify-start justify-center hover:bg-indigo-200 hover:text-indigo-600 hover:border-indigo-600"
							aria-label="Whitelist"
							title="Whitelist"
							onClick={() => handleChangeView()}
						>
							<FaUsers />
							Whitelist
						</button>
					) : (
						<button
							className="button md:w-auto w-full md:justify-start justify-center hover:bg-indigo-200 hover:text-indigo-600 hover:border-indigo-600"
							aria-label="Unfollowers"
							title="Unfollowers"
							onClick={() => handleChangeView()}
						>
							<FaUsers />
							Unfollowers
						</button>
					)}
					<button
						className="button hover:bg-red-200 hover:text-red-700 hover:border-red-700 disabled:opacity-60 disabled:pointer-events-none"
						aria-label="Unfollow All"
						title="Unfollow All"
						disabled={
							(view === IView.UNFOLLOWERS &&
								unfollowers.length - whitelist.length <= 0) ||
							(view === IView.WHITELIST && whitelist.length <= 0)
						}
						onClick={() => handleUnfollowAllUsers(view)}
					>
						<FaUsersSlash />
						Unfollow All
					</button>
				</div>
			</header>
			<Reorder.Group
				className="h-full flex flex-col gap-4 px-4 pb-8 list-none overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full hover:scrollbar-thumb-gray-500"
				values={users}
				onReorder={setUsers}
			>
				<AnimatePresence>
					{(view === IView.UNFOLLOWERS && unfollowers.length - whitelist.length > 0) ||
					(view === IView.WHITELIST && whitelist.length) ? (
						unfollowers
							.filter(
								({ login }) =>
									(view === IView.WHITELIST && whitelist.includes(login)) ||
									(view === IView.UNFOLLOWERS && !whitelist.includes(login))
							)
							.map((unfollower, index) => (
								<Reorder.Item
									value={unfollower.login}
									key={unfollower.login}
									variants={slideFade(index * 0.1)}
									initial="initial"
									animate="animate"
									exit="exit"
									drag={false}
								>
									<Unfollower
										unfollower={unfollower}
										view={view}
										handleUnfollowUser={handleUnfollowUser}
										handleAddUserToWhitelist={handleAddUserToWhitelist}
										handleRemoveUserFromWhitelist={handleRemoveUserFromWhitelist}
									/>
								</Reorder.Item>
							))
					) : (
						<span className="p-4 bg-green-100 border-2 border-green-200 rounded-2xl text-center text-gray-800 text-xl font-sans font-normal">
							Everything is OK 😉
						</span>
					)}
				</AnimatePresence>
			</Reorder.Group>
		</div>
	);
}
