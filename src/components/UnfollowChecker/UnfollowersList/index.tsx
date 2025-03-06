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
	handleRemoveUserFromWhitelist
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
		<div className='relative mb-44 h-full w-full overflow-hidden pb-24 md:w-4/6 md:pb-16'>
			<header className='mr-4 mb-4 flex flex-col items-center justify-between gap-2 md:mr-0 md:flex-row'>
				<span className='pl-0 font-sans text-gray-200 md:pl-4'>
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
				<div className='flex w-full items-center gap-4 pl-4 md:w-auto md:pl-0'>
					{view === IView.UNFOLLOWERS ? (
						<button
							className='button w-full justify-center hover:border-indigo-600 hover:bg-indigo-200 hover:text-indigo-600 md:w-auto md:justify-start'
							aria-label='Whitelist'
							title='Whitelist'
							onClick={() => handleChangeView()}
						>
							<FaUsers />
							Whitelist
						</button>
					) : (
						<button
							className='button w-full justify-center hover:border-indigo-600 hover:bg-indigo-200 hover:text-indigo-600 md:w-auto md:justify-start'
							aria-label='Unfollowers'
							title='Unfollowers'
							onClick={() => handleChangeView()}
						>
							<FaUsers />
							Unfollowers
						</button>
					)}
					<button
						className='button hover:border-red-700 hover:bg-red-200 hover:text-red-700 disabled:pointer-events-none disabled:opacity-60'
						aria-label='Unfollow All'
						title='Unfollow All'
						disabled={
							(view === IView.UNFOLLOWERS && unfollowers.length - whitelist.length <= 0) ||
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
				className='scrollbar scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full hover:scrollbar-thumb-gray-500 flex h-full list-none flex-col gap-4 overflow-y-auto px-4 pb-8'
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
									initial='initial'
									animate='animate'
									exit='exit'
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
						<span className='rounded-2xl border-2 border-green-200 bg-green-100 p-4 text-center font-sans text-xl font-normal text-gray-800'>
							Everything is OK 😉
						</span>
					)}
				</AnimatePresence>
			</Reorder.Group>
		</div>
	);
}
