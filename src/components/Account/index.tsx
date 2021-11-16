import Image from 'next/image';
import { signOut } from 'next-auth/client';

// --- Styles ---
import styles from './index.module.scss';
import { FaAt, FaDoorClosed, FaDoorOpen } from 'react-icons/fa';
import { useState } from 'react';

export default function AccountComponent({ account }): JSX.Element {
	const [isHover, setIsHover] = useState(false);

	const handleSignOutIcon = (value: boolean) => setIsHover(value);

	return (
		<div className={styles.account}>
			<a
				className={styles.login}
				href={account.html_url}
				target="_blank"
				rel="noopener noreferrer"
			>
				<picture className={styles.avatar}>
					<Image
						src={account.image}
						alt={`${account.image} Profile Image`}
						loading="lazy"
						layout="fill"
						objectFit="cover"
					/>
				</picture>
			</a>
			<div className={styles.content}>
				{account.name && <span className={styles.name}>{account.name}</span>}
				<a
					className={styles.login}
					href={account.html_url}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaAt />
					{account.login}
				</a>
			</div>
			<button
				className={styles.signOut}
				aria-label="Sign Out"
				title="Sign Out"
				onClick={() => signOut()}
				onMouseOver={() => handleSignOutIcon(true)}
				onMouseLeave={() => handleSignOutIcon(false)}
				onFocus={() => handleSignOutIcon(true)}
			>
				{isHover ? <FaDoorOpen /> : <FaDoorClosed />}
			</button>
		</div>
	);
}
