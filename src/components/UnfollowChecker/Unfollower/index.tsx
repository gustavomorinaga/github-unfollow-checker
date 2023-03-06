// --- Interfaces ---
import { IUnfollower } from '@interfaces/IUnfollower';
import { IView } from '@interfaces/IView';

// --- Styles ---
import styles from './index.module.scss';
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
		<div className={styles.unfollower}>
			<div className={styles.details}>
				<a href={unfollower.html_url} target="_blank" rel="noopener noreferrer">
					<picture className={styles.avatar}>
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
				<div className={styles.content}>
					<a
						className={styles.login}
						href={unfollower.html_url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{unfollower.login}
					</a>
				</div>
			</div>

			<div className={styles.actions}>
				{view === IView.UNFOLLOWERS ? (
					<button
						className={`button ${styles.add_whitelist}`}
						aria-label="Add to whitelist"
						title="Add to whitelist"
						onClick={() => handleAddUserToWhitelist(unfollower.login)}
					>
						<FaUserPlus />
						<span>Add to whitelist</span>
					</button>
				) : (
					<button
						className={`button ${styles.remove_whitelist}`}
						aria-label="Remove from whitelist"
						title="Remove from whitelist"
						onClick={() => handleRemoveUserFromWhitelist(unfollower.login)}
					>
						<FaUserMinus />
						<span>Remove from whitelist</span>
					</button>
				)}
				<button
					className={`button ${styles.unfollow}`}
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
