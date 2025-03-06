import type { JSX } from 'react';

// --- Interfaces ---
import type { IUnfollower } from '@interfaces/IUnfollower';
import { IView } from '@interfaces/IView';

// --- Styles ---
import { FaUserMinus, FaUserPlus, FaUserSlash } from 'react-icons/fa';

export default function Unfollower({
	unfollower,
	view,
	handleUnfollowUser,
	handleAddUserToWhitelist,
	handleRemoveUserFromWhitelist,
}: {
	unfollower: IUnfollower;
	view: IView;
	handleUnfollowUser: (unfollower: string, view: IView) => Promise<void>;
	handleAddUserToWhitelist: (unfollower: string) => Promise<void>;
	handleRemoveUserFromWhitelist: (unfollower: string) => Promise<void>;
}): JSX.Element {
	return (
		<div className="flex items-center justify-between gap-4 p-4 bg-gray-100 border-2 border-gray-400 hover:border-blue-400 rounded-3xl shadow-md transition-colors ease-in-out">
			<div className="flex items-center flex-1 min-w-0 w-full gap-4">
				<a href={unfollower.html_url} target="_blank" rel="noopener noreferrer">
					<picture className="relative block md:w-14 w-10 md:h-14 h-10 overflow-hidden pointer-events-auto rounded-full">
						<img
							src={unfollower.avatar_url}
							alt={`${unfollower.login} Profile Image`}
							title={unfollower.login}
							loading="lazy"
							width={100}
							height={100}
						/>
					</picture>
				</a>
				<div className="flex min-w-0">
					<a
						className="md:text-xl text-base font-sans font-normal truncate text-gray-600 hover:text-blue-400 no-underline hover:underline transition-colors ease-in-out"
						href={unfollower.html_url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{unfollower.login}
					</a>
				</div>
			</div>

			<div className="flex items-center gap-2">
				{view === IView.UNFOLLOWERS ? (
					<button
						className="button hover:bg-green-200 hover:text-green-700 hover:border-green-700"
						aria-label="Add to whitelist"
						title="Add to whitelist"
						onClick={() => handleAddUserToWhitelist(unfollower.login)}
					>
						<FaUserPlus />
						<span>Add to whitelist</span>
					</button>
				) : (
					<button
						className="button hover:bg-red-200 hover:text-red-700 hover:border-red-700"
						aria-label="Remove from whitelist"
						title="Remove from whitelist"
						onClick={() => handleRemoveUserFromWhitelist(unfollower.login)}
					>
						<FaUserMinus />
						<span>Remove from whitelist</span>
					</button>
				)}
				<button
					className="button hover:bg-red-200 hover:text-red-700 hover:border-red-700"
					aria-label="Unfollow"
					title="Unfollow"
					onClick={() => handleUnfollowUser(unfollower.login, view)}
				>
					<FaUserSlash />
					<span>Unfollow</span>
				</button>
			</div>
		</div>
	);
}
