import Image from 'next/image';

// --- Interfaces ---
import { IUnfollower } from '@interfaces/IUser';

// --- Styles ---
import styles from './index.module.scss';
import { FaUserPlus, FaUserSlash } from 'react-icons/fa';

export default function UnfollowerComponent({
	unfollower,
	handleUnfollowUser,
	handleAddUserToWhitelist,
}: {
	unfollower: IUnfollower;
	handleUnfollowUser: any;
	handleAddUserToWhitelist: any;
}): JSX.Element {
	return (
		<div className={styles.unfollower}>
			<div className={styles.details}>
				<a href={unfollower.html_url} target="_blank" rel="noopener noreferrer">
					<picture className={styles.avatar}>
						<Image
							src={unfollower.avatar_url}
							loading="lazy"
							layout="fill"
							objectFit="cover"
							alt={`${unfollower.login} Profile Image`}
							title={unfollower.login}
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
				<button
					className={styles.add_whitelist}
					aria-label="Add to whitelist"
					onClick={() => handleAddUserToWhitelist(unfollower.login)}
				>
					<FaUserPlus />
					Add to whitelist
				</button>
				<button
					className={styles.unfollow}
					aria-label="Unfollow"
					onClick={() => handleUnfollowUser(unfollower.login)}
				>
					<FaUserSlash />
					Unfollow
				</button>
			</div>
		</div>
	);
}
